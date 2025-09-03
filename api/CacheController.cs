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
    var apiToken = App.Settings.ApiToken;
    var zoneId = App.Settings.ZoneId;
    string apiUrl = $"https://api.cloudflare.com/client/v4/zones/{zoneId}/purge_cache";
    string jsonBody;

    if (bodyJson.flushUrl != null && !string.IsNullOrWhiteSpace((string)bodyJson.flushUrl))
    {
      jsonBody = JsonConvert.SerializeObject(new { files = new[] { (string)bodyJson.flushUrl } });
    }
    else
    {
      jsonBody = JsonConvert.SerializeObject(new { purge_everything = true });
    }

    using (var client = new HttpClient())
    {
      client.Timeout = TimeSpan.FromSeconds(15); // Set timeout
      // client.DefaultRequestHeaders.Add("X-Auth-Key", apiKey);
      // client.DefaultRequestHeaders.Add("X-Auth-Email", email);
      client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiToken}");

      var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
      try
      {
        var response = await client.PostAsync(apiUrl, content);
        var result = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            throw new HttpResponseException(response.StatusCode);
        }

        return result;
      }
      catch (TaskCanceledException ex)
      {
        return JsonConvert.SerializeObject(new
        {
          Message = "Task was canceled (timeout or network problem)",
          ExceptionType = ex.GetType().Name,
          ExceptionMessage = ex.Message
        });
      }
      catch (Exception ex)
      {
        // Other errors
        return JsonConvert.SerializeObject(new
        {
          Message = "Error making request",
          ExceptionType = ex.GetType().Name,
          ExceptionMessage = ex.Message
        });
      }
    }
  }
}