import { Router } from "express";
import { validate } from "../middlewares/validate";
import {
  createWorkspace,
  getWorkspaces,
} from "../controllers/workspace.controller";
import { createWorkspaceSchema } from "../middlewares/schemas/createWorkspace.schema";

const router = Router();

// /api/v1/workspace
router.post("", validate(createWorkspaceSchema), createWorkspace);

// /api/v1/workspace
router.get("", getWorkspaces);

export default router;
