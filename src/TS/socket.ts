import { io } from "socket.io-client";

const { REACT_APP_HOSTNAME } = process.env;

const IO = io(REACT_APP_HOSTNAME as string);

IO.on("connect_error", (err) => {
    console.log(err.toString());
});

export default IO;
