/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from "express";

/* GLOBAL TYPES FOR MODULE ADAPTATIONS */
declare global {
    namespace Express {
        interface Request {
            message: string;
        }
    }
}
