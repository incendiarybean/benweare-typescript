import type { NextFunction, Response } from "express";
import type { ApiRequest } from "../../lib/types";

const express = require("express"),
    router = express.Router(),
    Fetch = require("./collector"),
    storage = Fetch.storage;

/*--------------*/
/*    HANDLER   */
/*--------------*/

router.use(
    "/api/news",
    (req: ApiRequest, res: Response, next: NextFunction) => {
        const { outlet } = req.query;
        const possibleOutlets = ["bbc", "nasa", "pcgamer"];

        if (!outlet) {
            req.query = {};
        }

        if (outlet && !possibleOutlets.includes(outlet as string)) {
            req.message = `No outlet found: ${outlet?.toString()}`;
        }

        return next();
    }
);

router.get("/api/news", (req: ApiRequest, res: Response) => {
    try {
        const { bbc, pc, nasa } = storage.data;
        const { outlet } = req.query;
        const { message } = req;

        if (!bbc || !pc || !nasa) {
            throw Error();
        }

        let news_feed = [...bbc, ...pc, nasa];
        if (outlet) {
            news_feed = news_feed.filter(
                (article) =>
                    article.site.toUpperCase() ===
                    outlet.toString().toUpperCase()
            );
        }

        return res.json({
            items: news_feed,
            items_length: news_feed.length,
            message,
        });
    } catch (e: any) {
        console.log(e);
        return res.status(502).json({
            message: `News feed isn't working!`,
        });
    }
});

module.exports = router;
