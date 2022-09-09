import { io } from "socket.io-client";

const { REACT_APP_HOSTNAME, REACT_APP_SOCKET_TOKEN } = process.env;

if (!REACT_APP_HOSTNAME || !REACT_APP_SOCKET_TOKEN) {
    throw new Error("HOSTNAME or TOKEN missing for Socket.IO!");
}

const IO = io(REACT_APP_HOSTNAME, {
    auth: {
        token: process.env.REACT_APP_SOCKET_TOKEN,
    },
});

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;
