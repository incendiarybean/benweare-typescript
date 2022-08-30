const {
    routeHandler,
    validatorHandler,
    headerHandler,
    contentHandler,
} = require("../handlers");

const express = require("express");
const app = express();

app.use(headerHandler);

// SET CONTENT RULES \\
app.use(contentHandler);

// VALIDATE ROUTE \\
app.use(validatorHandler);

// USE ROUTES \\
app.use(routeHandler);

console.log = () => {};

export default app;
