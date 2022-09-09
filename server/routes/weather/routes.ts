import type { NextFunction, Request, Response } from "express";
import express from "express";
import * as Fetch from "./collector";
import { storage } from "./collector";

const router = express.Router();

/*--------------*/
/*    HANDLER   */
/*--------------*/

router.use(
    "/api/forecast",
    (req: Request, res: Response, next: NextFunction) => {
        const { date } = req.query;

        if (!date) {
            req.query = {};
        }

        if (date && !Fetch.isCorrectDateFormat(date as string)) {
            req.message = "Date should be in format: YYYY-MM-DD";
        }

        return next();
    }
);

router.get("/api/forecast", (req: Request, res: Response) => {
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

export default router;
