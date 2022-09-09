import { io } from "socket.io-client";

const IO = io("localhost:8080", {
    auth: {
        token: process.env.REACT_APP_SOCKET_TOKEN,
    },
});

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;
