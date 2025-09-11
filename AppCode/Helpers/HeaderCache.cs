using AppCode.Data;
using ToSic.Razor.Blade;

using System.Web;
using System;
using System.Linq;
using System.Collections.Generic;

using DotNetNuke.Entities.Portals;
using DotNetNuke.Entities.Tabs;

namespace AppCode.Helpers
{
	public class CDNCache : Custom.Hybrid.CodeTyped
	{
		// Set HTTP Cache Headers
		public void SetPublicCacheHeaders(HttpResponseBase Response, int browserCacheSeconds, int cloudflareCacheSeconds, string cacheTags = "")
		{
			Response.Cache.SetCacheability(HttpCacheability.Public);
			var ttlBrowser = TimeSpan.FromSeconds(browserCacheSeconds);
			var ttlCloudflare = TimeSpan.FromSeconds(cloudflareCacheSeconds);
			Response.Cache.SetMaxAge(ttlBrowser);
			Response.Cache.SetProxyMaxAge(ttlCloudflare);

			if (!string.IsNullOrEmpty(cacheTags))
				Response.Headers.Add("Cache-Tag", cacheTags);
		}

		// Find relevant cache setting for current or parent page
		public SettingsBundle FindRelevantCacheSetting(int currentTabId, IEnumerable<CacheSettings> allSettings)
		{
			var status = new SettingsBundle() { 
				ForPageId = currentTabId,
				OfPageId = currentTabId,
				Settings = allSettings?.FirstOrDefault(c => c.PageId == currentTabId),
				IgnoredPageSettings = null,
				TriedParents = false
			 };

			if (status.Settings == null || status.Settings.ApplyToPage == false)
				status = FindParentCacheSetting(status, allSettings);

			return status;
		}

		// Find cache setting from parent pages if not found on current page
		public SettingsBundle FindParentCacheSetting(SettingsBundle original, IEnumerable<dynamic> allSettings)
		{
			var portalId = PortalSettings.Current.PortalId;
			var parentTab = PortalSettings.Current.ActiveTab;
			while (parentTab != null)
			{
				// Check if we have a parent-page
				var parentId = parentTab.ParentId;
				parentTab = TabController.Instance.GetTab(parentId, portalId, false);
				if (parentTab == null)
					break;

				// See if the parent page has a setting which applies to children
				var parentSetting = allSettings?.FirstOrDefault(c => c.PageId == parentId);
				if (parentSetting?.ApplyToChildren == true)
					return new SettingsBundle(original) { OfPageId = parentId, Settings = parentSetting };
			}
			return new SettingsBundle(original) { OfPageId = 0, Settings = null };
		}

		// Get value from settings or fallback
		public dynamic GetSettingValue(SettingsBundle status, string key, dynamic fallback)
		{
			if (status.Found && status.Settings.Get(key) != null)
				return status.Settings.Get(key);
			return fallback;
		}

		// Get toolbar for editing
		public dynamic GetToolbar(SettingsBundle status, int currentTabId)
		{
			var appSettings = As<AppSettings>(App.Settings);
			var appResources = As<AppResources>(App.Resources);

			// Only allow editing if user is SystemAdmin, when RestrictEditToSuperUser is enabled
			if (appSettings.RestrictEditToSuperUser && !MyUser.IsSystemAdmin)
			{
				// Show info toolbar if user lacks sufficient permissions
				return Kit.Toolbar.Empty().Info(tweak: b => b.Note(appResources.InfoHostPermissions));
			}

			// Explicitly restricted users cannot edit
			if (appSettings.RestrictEditToUsers.Contains(MyUser.Username))
			{
				// Show info toolbar for users not allowed to edit
				return Kit.Toolbar.Empty().Info(tweak: b => b.Note(appResources.InfoUserNotAllowed));
			}

			// Build toolbar depending on the current status
			if (status.Found)
			{
				// If settings are inherited from parent and there are no ignored page settings
				if (status.IsOfParent && status.IgnoredPageSettings == null)
				{
					return Kit.Toolbar.Default().Edit("-").New("CacheSettings", tweak: b => b.Color("gray").Prefill("PageId", currentTabId));
				}

				// If there are ignored page settings, use them
				if (status.IgnoredPageSettings != null)
				{
					return Kit.Toolbar.Default(status.IgnoredPageSettings).New("-");
				}

				// Otherwise, use the found settings
				return Kit.Toolbar.Default(status.Settings).New("-");
			}

			// Default: create a toolbar for new CacheSettings
			return Kit.Toolbar.Default().New("CacheSettings", tweak: b => b.Color("gray").Prefill("PageId", currentTabId));
		}

		// Render settings info block
		public IHtmlString RenderSettingsInfo(SettingsBundle status, int currentTabId)
		{
			var appResources = As<AppResources>(App.Resources);

			if (!status.Found)
				return new HtmlString("<div>" + appResources.MsgNoSettings.Replace("([currentpage])", currentTabId.ToString()) + "</div>");

			var info = "";
			if (status.IsOfParent && status.Settings.ApplyToChildren)
			{
				if (status.IgnoredPageSettings != null && status.TriedParents)
				{
					info += $"<div>{appResources.MsgNotAppliedSettings}<div>{appResources.LabelTitle} <strong>{Text.First(status.IgnoredPageSettings.Title, "-")}</strong></div></div>";
				}
				info += $"<div>{appResources.MsgAppliedFromParent.Replace("([parentpage])", status.OfPageId.ToString())} {status.ForPageId}</div>";
			}
			if (!status.IsOfParent && status.Settings.ApplyToPage)
			{
				info += $"<div>{appResources.MsgAppliedToPage} {currentTabId}</div>";
			}
			info += $"<div>{appResources.LabelTitle} <strong>{Text.First(status.Settings.Title, "-")}</strong></div>";
			return new HtmlString(info);
		}

		// SettingsBundle class
		public class SettingsBundle
		{
			public SettingsBundle() { }
			public SettingsBundle(SettingsBundle original)
			{
				ForPageId = original.ForPageId;
				IgnoredPageSettings = original.Settings;
				TriedParents = true;
			}
			public int ForPageId;
			public bool IsOfParent { get { return ForPageId != OfPageId; } }
			public int OfPageId;
			public bool Found { get { return Settings != null; } }
			public dynamic Settings;
			public dynamic IgnoredPageSettings;
			public bool TriedParents;
		}		
	}
}