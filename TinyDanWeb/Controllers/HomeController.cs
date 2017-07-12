namespace TinyDan.Controllers
{
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Mvc;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;

    public class HomeController : Controller
    {
        private const string JavascriptKey = "js";
        private const string CssKey = "css";

        private readonly string _applicationBasePath;

        public HomeController(IHostingEnvironment env)
        {
            this._applicationBasePath = env.WebRootPath;
        }

        public IActionResult Index()
        {
            var json = GetWebpackAssetsJson(this._applicationBasePath);
            ViewBag.PolyfillsScript = json.SelectToken("polyfills").Value<string>(JavascriptKey);
            ViewBag.VendorScript = json.SelectToken("vendor").Value<string>(JavascriptKey);
            ViewBag.AppScript = json.SelectToken("app").Value<string>(JavascriptKey);
            ViewBag.SiteCss = json.SelectToken("app").Value<string>(CssKey);

            return View();
        }

        private static JObject GetWebpackAssetsJson(string applicationBasePath)
        {
            JObject webpackAssetsJson;
            string webpackAssetsFilePath = $"{applicationBasePath}\\data\\webpack.assets.json";

            using (var webpackAssetsFile = System.IO.File.OpenText(webpackAssetsFilePath))
            {
                using (var webpackAssetsReader = new JsonTextReader(webpackAssetsFile))
                {
                    webpackAssetsJson = (JObject)JToken.ReadFrom(webpackAssetsReader);
                }
            }

            return webpackAssetsJson;
        }
    }
}
