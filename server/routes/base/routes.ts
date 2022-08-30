import { Request, Response } from "express";

const path = require("path");
const express = require("express");
const router = express.Router();

/*--------------*/
/*    HANDLER   */
/*--------------*/

const index = `../${process.env.APP_PATH}/index.html`;

router
    .route("/")
    .get((req: Request, res: Response) => {
        return res.sendFile(path.join(__dirname, index));
    })
    .post((req: Request, res: Response) => {
        return res.json({
            code: 400,
            message: `${req.method} is not defined on ${req.path}`,
        });
    });

router
    .route("*")
    .get((req: Request, res: Response) => {
        return res.sendFile(path.join(__dirname, index));
    })
    .post((req: Request, res: Response) => {
        return res.json({
            code: 400,
            message: `${req.method} is not defined on ${req.path}`,
        });
    });

module.exports = router;
