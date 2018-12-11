import {createServer} from "http";
import {json} from "body-parser";
import express from "express";
import passport from "passport";
import { MongooseClient } from "./data/MongooseClient";
import { enableSessions } from "./session";
import { SocketServer, initSockets} from "./Sockets";
import { initPassport } from "./auth"
import Routes from "./Routes";

const siteName = process.env.WEBSITE_SITE_NAME; // Azure default

export const start = port => {
  const app = express();
  const appRootUrl = siteName ? `https://${siteName}.azurewebsites.net` : `http://localhost:${port}`;
  MongooseClient.InitMongoConnection();
  initPassport(appRootUrl);
  enableSessions(app, SocketServer);
  initSockets();
  app.use(json())
  app.use(passport.initialize());
  app.use(passport.session());
  const server = createServer(app);
  SocketServer.attach(server);

  app.use(Routes);

  async function close() {
    await new Promise(resolve => server.close(() => resolve()))
    await MongooseClient.disconnect()
  }

  return new Promise(resolve => {
    server.listen(port, () => {
      console.log(`Server listening at port ${port}`);
      resolve(close)
    });
  })
};
