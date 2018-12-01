import {createServer} from "http";
import {resolve} from "path";
import {json} from "body-parser";
import express from "express";
import passport from "passport";
import { MongooseClient } from "./data/MongooseClient";
import { User } from "./data/User";
import { enableSessions } from "./session";
import { SocketServer, initSockets} from "./Sockets";
import { initPassport, uiAuth } from "./auth"

import Routes from "./Routes";

const siteName = process.env.WEBSITE_SITE_NAME; // Azure default
const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : "http://localhost:3000";
const app = express();

MongooseClient.InitMongoConnection();
initPassport(appRootUrl);
enableSessions(app, SocketServer);
initSockets();
app.use(json())
app.use(passport.initialize());
app.use(passport.session());
const server = createServer(app);
SocketServer.attach(server);

app.get("/", uiAuth, (req, res, next) => {
  return User.validProfile(req.user) ? next() : res.redirect("/profile");
});

app.use("/api", Routes);

app.get("/logout", (req, res) => {
  req.logout()
  res.redirect("/login")
})
app.get("/login", serveUI)
app.get("/signup", serveUI)
// Important!! Resolve serving of static files before catch-em-all serve
app.use(express.static(resolve(__dirname, "../../dist")));
app.get("*", uiAuth, serveUI)

function serveUI(req, res) {
  res.sendFile(resolve(__dirname, "../../dist/index.html"));
}

export const start = port => {
  server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
  });
  return server;
};