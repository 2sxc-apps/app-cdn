using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using DotNetNuke.Security;
using DotNetNuke.Web.Api;
using ToSic.SexyContent.WebApi;
using Newtonsoft.Json;

public class CacheController : SxcApiController
{
    [HttpPost]
    [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
    [ValidateAntiForgeryToken]
    public async Task<string> Purge([FromBody] dynamic bodyJson)
    {
        var apiKey = App.Settings.ApiKey;
        var apiToken = App.Settings.ApiToken;
        var zoneId = App.Settings.ZoneId;
        var email = App.Settings.CloudflareEmail;
        var flushUrl = bodyJson.flushUrl != null && !string.IsNullOrWhiteSpace((string)bodyJson.flushUrl)
            ? (string)bodyJson.flushUrl
            : null;

        using (var client = new HttpClient())
        {
            // client.DefaultRequestHeaders.Add("X-Auth-Key", apiKey);
            // client.DefaultRequestHeaders.Add("X-Auth-Email", email);
            client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiToken}");

            string apiUrl = $"https://api.cloudflare.com/client/v4/zones/{zoneId}/purge_cache";
            string jsonBody;

            if (string.IsNullOrWhiteSpace(flushUrl))
            {
                // Purge everything
                jsonBody = JsonConvert.SerializeObject(new { purge_everything = true });
            }
            else
            {
                // Purge specific URL
                jsonBody = JsonConvert.SerializeObject(new { files = new[] { flushUrl } });
            }

            var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
            var response = await client.PostAsync(apiUrl, content);
            var result = await response.Content.ReadAsStringAsync();

            return result;
        }
    }
}