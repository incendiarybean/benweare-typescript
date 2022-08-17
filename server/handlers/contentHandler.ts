import { Application } from "express";

const cors = require("cors");
const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./schema/swagger.json");

/**
 * This is purely to configure the static paths and CORS
 * @param app Application - for configuring static files and CORS
 */
const routeContent = (app: Application) => {
    console.log(`[${new Date()}] Configuring CORS...`);

    const indexLocation: string =
        process.env.NODE_ENV === "production" ? "../app" : "../../build";

    app.use(
        cors({
            origin:
                process.env.NODE_ENV !== "development"
                    ? "https://benweare.co.uk"
                    : "*",
            methods: "GET,HEAD",
        })
    );
    app.use(express.json());
    app.use(express.static(path.join(__dirname, indexLocation)));
    app.use(
        "/favicon.ico",
        express.static(path.join(__dirname, `${indexLocation}/favicon.ico`))
    );
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default routeContent;