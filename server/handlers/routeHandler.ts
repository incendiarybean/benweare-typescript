const express = require("express");
const router = express.Router();
const routes = require("../routes");

router.use(routes.news_routes);
router.use(routes.weather_routes);
router.use(routes.base_routes);

module.exports = router;
