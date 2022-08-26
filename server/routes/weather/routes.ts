import type { NextFunction, Response } from "express";
import type { ApiRequest } from "../../lib/types";

const express = require("express"),
    router = express.Router(),
    Fetch = require("./collector"),
    storage = Fetch.storage;

/*--------------*/
/*    HANDLER   */
/*--------------*/

router.use((req: ApiRequest, res: Response, next: NextFunction) => {
    const { date } = req.query;

    if (!date) {
        req.query = {};
    }

    if (date && !Fetch.isCorrectDateFormat(date)) {
        req.message = "Date should be in format: YYYY-MM-DD";
    }

    return next();
});

router.get("/api/forecast", (req: ApiRequest, res: Response) => {
    try {
        const { timeseries, location } = storage.data;
        const { date } = req.query;
        const { message } = req;

        if (!timeseries) {
            throw Error();
        }

        let selectedTimeseries = timeseries;
        if (date) {
            try {
                selectedTimeseries = Fetch.getDayByDate(
                    date.toString(),
                    timeseries
                );
            } catch (e: any) {
                req.message = "Date should be in format: YYYY-MM-DD";
            }
        }

        return res.json({
            items: selectedTimeseries,
            items_length: selectedTimeseries.length,
            location,
            message,
        });
    } catch (e: any) {
        return res.status(502).json({
            message: `Weather feed isn't working!`,
        });
    }
});

module.exports = router;
