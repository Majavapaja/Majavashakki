import expressSession from "express-session";
import MongoStore from "connect-mongo";
import socketIoSession from "express-socket.io-session";
import {MongooseClient} from "./data/MongooseClient";
import { Server } from "socket.io"

const MajavashakkiSessionSecret = process.env.MajavashakkiSessionSecret;
if (!MajavashakkiSessionSecret) {
  throw Error("Majavashakki session secret is missing")
}

export const getSession = (x: any): any =>
  x.session ? x.session : x.handshake.session;

export const enableSessions = (app: any, io: Server) => {
  const s = expressSession({
    store: MongoStore.create({
      // @ts-ignore TS2322
      client: MongooseClient.getConnection().getClient(),
    }),
    secret: MajavashakkiSessionSecret,
    resave: false,
    saveUninitialized: true,
  });

  app.use(s);
  io.use(socketIoSession(s, {autoSave: true}));
};
