const path = require("path");
const fs = require("fs");
const express = require("express");
const homeManifest = require("./dist/home/node/ssr-manifest.json");
const mobileManifest = require("./dist/mobile/node/ssr-manifest.json");
const adminReactManifest = require("./dist/admin-react/node/asset-manifest.json");
const { renderToString } = require("vue/server-renderer");
const { createElement } = require("react");
const { renderToString: renderReactToString  } = require('react-dom/server');
const homePath = path.join(
  __dirname,
  "./dist/home",
  "node",
  homeManifest["index.js"]
);
const createHomeApp = require(homePath).default;

const adminReactPath = path.join(
  __dirname,
  "./dist/admin-react",
  "node",
  adminReactManifest["files"]["main.js"]
);
const createAdminReactApp = require(adminReactPath).default;

const mobilePath = path.join(
  __dirname,
  "./dist/mobile",
  "node",
  mobileManifest["index.js"]
);
const createMobileApp = require(mobilePath).default;

const app = express();

app.use(
  "/home-assets",
  express.static(path.join(__dirname, "./dist/home/client", "home-assets"))
);

app.use(
  "/mobile-assets",
  express.static(path.join(__dirname, "./dist/mobile/client", "mobile-assets"))
);

app.use(
  "/static",
  express.static(path.join(__dirname, "./dist/admin-react/client", "static"))
);

const adminReactTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/admin-react/client/index.html"),
  "utf-8"
);

const homeTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/home/client/index.html"),
  "utf-8"
);

const mobileTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/mobile/client/index.html"),
  "utf-8"
);

app.get("/", async (req, res) => {
  const { app } = createHomeApp();

  const appContent = await renderToString(app);

  const html = homeTemplate
    .toString()
    .replace('<div id="app">', `<div id="app">${appContent}`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/mobile/*", async (req, res) => {
  const { app, router } = createMobileApp();

  await router.push(req.url);
  await router.isReady();

  const appContent = await renderToString(app);

  const html = mobileTemplate
    .toString()
    .replace('<div id="app">', `<div id="app">${appContent}`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/admin-react/*", async (req, res) => {

  const app = createElement(createAdminReactApp(req.url))
  const appContent = renderReactToString(app);
  const html = adminReactTemplate
    .toString()
    .replace('<div id="root">', `<div id="root">${appContent}`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.get("/admin-react", async (req, res, next) => {
  res.status(301).redirect("/admin-react/");
  next();
});

app.get("/mobile", async (req, res, next) => {
  res.status(301).redirect("/mobile/");
  next();
});

app.listen(3000);
