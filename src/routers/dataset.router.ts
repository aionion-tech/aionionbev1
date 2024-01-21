import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createDataset } from "../controllers/dataset.controller";
import { createDatasetSchema } from "../middlewares/schemas/createDataset.schema";

const router = Router();

// /api/v1/dataset
router.post("", validate(createDatasetSchema), createDataset);

export default router;
