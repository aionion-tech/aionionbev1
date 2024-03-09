import { Router } from "express";
import { namespaceCheck } from "../middlewares/namespaceCheck.middleware";
import {
  getDatasetSettings,
  updateDatasetSettings,
} from "../controllers/datasetSettings.controller";

const router = Router();

// /api/v1/datasetSettings/:workspaceId/:projectId/:datasetId
router.get(
  "/:workspaceId/:projectId/:datasetId",
  namespaceCheck,
  getDatasetSettings
);

// /api/v1/datasetSettings/:workspaceId/:projectId/:datasetId
router.put(
  "/:workspaceId/:projectId/:datasetId",
  namespaceCheck,
  updateDatasetSettings
);

export default router;
