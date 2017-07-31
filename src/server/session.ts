import * as expressSession from "express-session"
import * as socketIoSession from "express-socket.io-session"

export const getSession = (x: any): any =>
  x.session ? x.session : x.handshake.session

export const enableSessions = (app: any, io: SocketIO.Server) => {
  const s = expressSession({
    secret: "pissa kakka", // TODO: Make it secret
    resave: false,
    saveUninitialized: true,
  })

  app.use(s)
  io.use(socketIoSession(s, {autoSave: true}))
}
