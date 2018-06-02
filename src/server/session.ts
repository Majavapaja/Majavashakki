import * as expressSession from "express-session";
import * as ConnectMongo from "connect-mongo";
import * as socketIoSession from "express-socket.io-session";
import {MongooseClient} from "./data/MongooseClient"

const SESSION_SECRET = process.env.SESSION_SECRET
if (!SESSION_SECRET) throw new Error("Environment variable SESSION_SECRET missing")

export const getSession = (x: any): any =>
  x.session ? x.session : x.handshake.session;

export const enableSessions = (app: any, io: SocketIO.Server) => {
  const MongoStore = ConnectMongo(expressSession)
  const s = expressSession({
    store: new MongoStore({ mongooseConnection: MongooseClient.getConnection() }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  });

  app.use(s);
  io.use(socketIoSession(s, {autoSave: true}));
};
