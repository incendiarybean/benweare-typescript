import path from "path";
import cors from "cors";
import express from "express";
import * as swaggerUi from "swagger-ui-slim";
import schema from "./schema";

const router = express.Router();

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

export default router;
