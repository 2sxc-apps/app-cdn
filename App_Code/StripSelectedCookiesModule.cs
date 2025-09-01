// StripSelectedCookiesModule.cs
using System;
using System.Collections.Generic;
using System.Web;

// Add to <system.webServer><modules>
// <add name="StripSelectedCookies" type="ToSic.Dnn.StripSelectedCookiesModule" preCondition="managedHandler" />
namespace ToSic.Dnn
{
    public sealed class StripSelectedCookiesModule : IHttpModule
    {
        private static readonly HashSet<string> DropCookies = new HashSet<string>(
            new[] { "language", "dnn_IsMobile" },
            StringComparer.OrdinalIgnoreCase
        );

        public void Init(HttpApplication app)
        {
            app.PreSendRequestHeaders += (s, e) =>
            {
                var ctx = ((HttpApplication)s).Context;
                FilterSetCookie(ctx);
            };
        }

        private static void FilterSetCookie(HttpContext ctx)
        {
            var headers = ctx.Response.Headers;

            var setCookies = headers.GetValues("Set-Cookie");
            if (setCookies == null || setCookies.Length == 0) return;

            var keep = new List<string>(setCookies.Length);

            foreach (var line in setCookies)
            {
                int eq = line.IndexOf('=');
                if (eq <= 0) { keep.Add(line); continue; }

                var name = line.Substring(0, eq).Trim();
                if (DropCookies.Contains(name)) continue;

                keep.Add(line);
            }

            headers.Remove("Set-Cookie");
            foreach (var v in keep)
                headers.Add("Set-Cookie", v);
        }

        public void Dispose() { }
    }
}