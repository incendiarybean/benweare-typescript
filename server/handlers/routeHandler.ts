const express = require("express");
const router = express.Router();
const routes = require("../routes");

router.use("/api/news", routes.news_routes);
router.use("/api/forecast", routes.weather_routes);
router.use("/", routes.base_routes);

module.exports = router;
