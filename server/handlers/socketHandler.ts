import { IO } from "..";

const socketHandler = () => {
    IO.on("connection", () => {
        IO.use((socket, next) => {
            if (
                !socket.handshake.auth.token ||
                socket.handshake.auth.token !== process.env.SOCKET_TOKEN
            ) {
                console.log(
                    `[${new Date()}] Request received without SOCKET_TOKEN.`
                );
                return next(new Error("Missing Authentication Token"));
            }
            next();
        });
    });
};

export default socketHandler;
