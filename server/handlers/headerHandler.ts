import { NextFunction, Request, Response } from "express";

/**
 * Heroku uses a host-based certificate
 * We force the client to run on HTTPS and use the parent certificate
 * @param req Request - for checking HTTPS status
 * @param res Response - to redirect where necessary
 * @param next NextFunction - to continue after check
 */
const forceHTTPS = (req: Request, res: Response, next: NextFunction) => {
    const isSecure =
        req.secure ||
        ((req.headers["x-forwarded-proto"] as string) || "").includes("https");

    console.log(isSecure);

    if (!isSecure) {
        if (req.method === "GET" || req.method === "HEAD") {
            const host = req.headers["x-forwarded-host"] || req.headers.host;
            res.redirect(301, "https://" + host + req.originalUrl);
        } else {
            res.status(403).send(
                "Please use HTTPS when submitting data to this server."
            );
        }
    }

    next();
};

export default forceHTTPS;