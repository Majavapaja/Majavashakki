import * as expressSession from "express-session";
import * as ConnectMongo from "connect-mongo";
import * as socketIoSession from "express-socket.io-session";
import * as crypto from "crypto"
import {MongooseClient} from "./data/MongooseClient";

let MajavashakkiSessionSecret = process.env.MajavashakkiSessionSecret;
if (!MajavashakkiSessionSecret) {
  console.warn("[WARNING] Environment variable 'MajavashakkiSessionSecret' missing!")
  MajavashakkiSessionSecret = crypto.randomBytes(20).toString("hex");
}

export const getSession = (x: any): any =>
  x.session ? x.session : x.handshake.session;

export const enableSessions = (app: any, io: SocketIO.Server) => {
  const MongoStore = ConnectMongo(expressSession);
  const s = expressSession({
    store: new MongoStore({ mongooseConnection: MongooseClient.getConnection() }),
    secret: MajavashakkiSessionSecret,
    resave: false,
    saveUninitialized: true,
  });

  app.use(s);
  io.use(socketIoSession(s, {autoSave: true}));
};
