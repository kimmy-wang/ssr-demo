const { createElement } = require("react");
const { renderToString  } = require('react-dom/server');
const path = require("path");
const fs = require("fs");
const express = require("express");
const homeManifest = require("./dist/admin-react/node/asset-manifest.json");
const homePath = path.join(
  __dirname,
  "./dist/admin-react",
  "node",
  homeManifest["files"]["main.js"]
);
const createHomeApp = require(homePath).default;
const app = express();

app.use(
  "/static",
  express.static(path.join(__dirname, "./dist/admin-react/client", "static"))
);

const homeTemplate = fs.readFileSync(
  path.join(__dirname, "./dist/admin-react/client/index.html"),
  "utf-8"
);

app.get("*", async (req, res) => {

  const app = createElement(createHomeApp(req.url))
  const appContent = renderToString(app);
  const html = homeTemplate
    .toString()
    .replace('<div id="root">', `<div id="root">${appContent}`);

  res.setHeader("Content-Type", "text/html");
  res.send(html);
});

app.listen(3000);
