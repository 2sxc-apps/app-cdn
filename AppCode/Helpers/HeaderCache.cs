using System.Web;
using System;

namespace AppCode.Helpers
{
    // public class HeaderCache : Custom.Hybrid.CodeTyped
    public class HeaderCache
    {
        public static void SetPublicCacheHeaders(HttpResponseBase Response, int browserCacheSeconds, int cloudflareCacheSeconds)
        {
            Response.Cache.SetCacheability(HttpCacheability.Public);
            var ttlBrowser = TimeSpan.FromSeconds(browserCacheSeconds);
            var ttlCloudflare = TimeSpan.FromSeconds(cloudflareCacheSeconds);
            Response.Cache.SetMaxAge(ttlBrowser);
            Response.Cache.SetProxyMaxAge(ttlCloudflare);
        }
    }
}