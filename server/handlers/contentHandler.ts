import schema from "./schema";

const cors = require("cors");
const express = require("express");
const path = require("path");
const swaggerUi = require("swagger-ui-slim");
const router = express.Router();

/**
 * This is purely to configure the static paths and CORS
 * @param app Application - for configuring static files and CORS
 */
console.log(`[${new Date()}] Configuring CORS...`);

router.use(
    cors({
        origin:
            process.env.NODE_ENV !== "development"
                ? "https://benweare.co.uk"
                : "*",
        methods: "GET,HEAD",
    })
);
router.use(express.json());
router.use(express.static(path.join(__dirname, process.env.APP_PATH || "")));
router.use(
    "/favicon.ico",
    express.static(path.join(__dirname, `${process.env.APP_PATH}/favicon.ico`))
);
router.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.build(schema, {
        customSiteTitle: "Ben's API Docs",
        faviconUrl: `/favicon.ico`,
    })
);

module.exports = router;
