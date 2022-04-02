var path = require("path");
var fs = require("fs");
var express = require("express");
const homeManifest = require("./dist/home/node/ssr-manifest.json");
const { renderToString } = require("vue/server-renderer");
const homePath = path.join(
  __dirname,
  "./dist/home",
  "node",
  homeManifest["index.js"]
);
const createHomeApp = require(homePath).default;

var app = express();

app.use(
  "/home-assets",
  express.static(path.join(__dirname, "./dist/home/client", "home-assets"))
);

const homeTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/home/client/index.html"),
  "utf-8"
);

app.get("/", async (req, res) => {
  const { app, router } = createHomeApp();

  // await router.push(req.url);
  // await router.isReady();

  const appContent = await renderToString(app);

  const html = homeTemplate
    .toString()
    .replace('<div id="app">', `<div id="app">${appContent}`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(3000);
