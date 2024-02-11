import { Router } from "express";
import { validate } from "../middlewares/validate";
import { createDataset, getDatasets } from "../controllers/dataset.controller";
import { createDatasetSchema } from "../middlewares/schemas/createDataset.schema";

const router = Router();

// /api/v1/dataset
router.get("/:workspaceId/:projectId", getDatasets);

// /api/v1/dataset
router.post(
  "/:workspaceId/:projectId",
  validate(createDatasetSchema),
  createDataset
);

export default router;
