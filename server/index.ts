import { Server } from "http";

const express = require("express");
const app = express();

require("dotenv").config();

const {
    contentHandler,
    headerHandler,
    routeHandler,
    validatorHandler,
} = require("./handlers");

console.log(`[${new Date()}] ENV: ${process.env.NODE_ENV}`);
if (process.env.NODE_ENV === "production") app.use(headerHandler);

export const server: Server = require("http")
    .createServer(app)
    .listen(process.env.PORT || process.env.HTTPS || 8080, (err: any) => {
        if (err) throw err;
        console.log(
            `[${new Date()}] Server is active on port: ${
                process.env.PORT || process.env.HTTPS || 8080
            }`
        );
    });

// SET CONTENT RULES \\
app.use(contentHandler);

// VALIDATE ROUTE \\
app.use(validatorHandler);

// USE ROUTES \\
app.use(routeHandler);
