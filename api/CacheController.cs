using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Linq;
using DotNetNuke.Security;
using DotNetNuke.Web.Api;
using ToSic.SexyContent.WebApi;
using Newtonsoft.Json;

public class CacheController : SxcApiController
{
  [HttpPost]
  [DnnModuleAuthorize(AccessLevel = SecurityAccessLevel.Anonymous)]
  [ValidateAntiForgeryToken]
  public async Task<IHttpActionResult> Purge([FromBody] dynamic bodyJson)
  {
    var apiToken = App.Settings.ApiToken;
    var zoneId = App.Settings.ZoneId;
    var apiUrl = $"https://api.cloudflare.com/client/v4/zones/{zoneId}/purge_cache";

    object purgePayload;
    var tagsString = (string)bodyJson.tags;
    var flushUrl = (string)bodyJson.flushUrl;

    if (!string.IsNullOrWhiteSpace(tagsString))
    {
        var tags = tagsString.Split(',')
            .Select(t => t.Trim())
            .Where(t => !string.IsNullOrWhiteSpace(t))
            .ToArray();

        if (tags.Length > 0)
        {
            purgePayload = new { tags };
        }
        else
        {
            purgePayload = new { purge_everything = true };
        }
    }
    else if (!string.IsNullOrWhiteSpace(flushUrl))
    {
        purgePayload = new { files = new[] { flushUrl } };
    }
    else
    {
        purgePayload = new { purge_everything = true };
    }

    using (var client = new HttpClient())
    {
      client.Timeout = TimeSpan.FromSeconds(15); // Set timeout
      client.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiToken}");

      var jsonBody = JsonConvert.SerializeObject(purgePayload);
      var content = new StringContent(jsonBody, Encoding.UTF8, "application/json");
      try
      {
        var response = await client.PostAsync(apiUrl, content);
        var result = await response.Content.ReadAsStringAsync();

        if (!response.IsSuccessStatusCode)
        {
            return Content(response.StatusCode, JsonConvert.DeserializeObject(result));
        }

        return Ok(JsonConvert.DeserializeObject(result));
      }
      catch (TaskCanceledException ex)
      {
        return Json(new
        {
          Message = "Task was canceled (timeout or network problem)",
          ExceptionType = ex.GetType().Name,
          ExceptionMessage = ex.Message
        });
      }
      catch (Exception ex)
      {
        // Other errors
        return Json(new
        {
          Message = "Error making request",
          ExceptionType = ex.GetType().Name,
          ExceptionMessage = ex.Message
        });
      }
    }
  }
}