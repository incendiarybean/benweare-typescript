import express from "express";
import { baseRoutes, newsRoutes, weatherRoutes } from "../routes";

const router = express.Router();

router.use(newsRoutes);
router.use(weatherRoutes);
router.use(baseRoutes);

export default router;
