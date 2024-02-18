import { Router } from "express";
import {
  createDatasetItem,
  getDatasetItems,
} from "../controllers/DatasetItem.controller";
import { uploadHandler } from "../middlewares/upload.middleware";
import { namespaceCheck } from "../middlewares/namespaceCheck.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

// /api/v1/datasetitem
router.get(
  "/:workspaceId/:projectId/:datasetId",
  auth,
  namespaceCheck,
  getDatasetItems
);

// /api/v1/datasetitem
router.post(
  "/:workspaceId/:projectId/:datasetId",
  auth,
  namespaceCheck,
  uploadHandler.single("photo"),
  createDatasetItem
);

export default router;
