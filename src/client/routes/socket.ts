import io from "socket.io-client"

let socket: SocketIOClient.Socket

const connectSocket = () => {
    socket = io()
}

export const getSocket = () => {
    if (!socket) connectSocket()
    return socket
}
