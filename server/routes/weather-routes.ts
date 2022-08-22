import { Application } from "express";
import { MOCK_WEATHER_RESPONSE } from "../lib/resource-data";
import {
    WeatherStorage,
    WeatherAxiosResponse,
    WeatherResponse,
    WeatherConfig,
} from "../lib/types";
const axios = require("axios");

const weather_routes = (app: Application) => {
    /*--------------*/
    /*    CONFIG    */
    /*--------------*/

    const storage: WeatherStorage = {
        timestamp: null,
        data: { day: null, days: null, location: null },
    };

    const config: WeatherConfig = {
        method: "GET",
        url: "https://api-metoffice.apiconnect.ibmcloud.com/metoffice/production/v0/forecasts/point/daily",
        qs: {
            includeLocationName: "true",
            latitude: process.env.LATITUDE || "",
            longitude: process.env.LONGITUDE || "",
        },
        headers: {
            "x-ibm-client-id": process.env.MET_CLIENT_ID || "",
            "x-ibm-client-secret": process.env.MET_API_SECRET || "",
            accept: "application/json",
        },
    };

    /*--------------*/
    /*   ACTIONS    */
    /*--------------*/

    setTimeout(async () => {
        console.log(`[${new Date()}] Initialising Weather Cache...`);

        if (process.env.NODE_ENV !== "production") {
            console.log(`[${new Date()}] Mock Weather Used...`);
            storage.data = MOCK_WEATHER_RESPONSE as WeatherResponse;
            return;
        }

        getWeather();
        setInterval(async () => {
            getWeather();
        }, 900000);
    }, 0);

    const getWeather = async () => {
        const weatherUrl = new URL(
            `${config.url}?${new URLSearchParams(config.qs).toString()}`
        ).toString();

        axios
            .get(weatherUrl, { headers: config.headers })
            .then((response: WeatherAxiosResponse) => {
                if (response.status !== "429") {
                    const { data } = response;
                    const { features } = data;

                    if (features) {
                        data.location = features[0].properties.location.name;
                        data.days = features[0].properties.timeSeries;
                        data.day = data.days.filter(
                            ({ time }) =>
                                new Date(time).toDateString() ===
                                new Date().toDateString()
                        )[0];

                        delete data.type;
                        delete data.features;
                        delete data.parameters;
                    }

                    storage.data = data;
                    storage.timestamp = new Date().toISOString();
                }
            });
        console.log(`[${new Date()}] Could not get Weather at this time.`);
    };

    /*--------------*/
    /*    HANDLER   */
    /*--------------*/

    app.route("/api/weather").get(async (req, res) => {
        try {
            const { day, days, location } = storage.data;
            const { timeframe } = req.query;
            switch (true) {
                case timeframe === "today" && day !== null:
                    return res.json({ day, location });
                case timeframe === "week" && days !== null:
                    return res.json({ days, location });
                default:
                    throw Error();
            }
        } catch (e: any) {
            if (!["today", "week"].includes(req.query.timeframe as string)) {
                return res.status(404).json({
                    message: `No timeframe found: ${
                        req.query.timeframe || "Please enter a timeframe query."
                    }`,
                });
            }
            return res.status(502).json({
                message: `Weather feed '${req.query.timeframe}' isn't working!`,
            });
        }
    });
};

export default weather_routes;
