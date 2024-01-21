import { Router } from "express";
import { createProject } from "../controllers/project.controller";
import { validate } from "../middlewares/validate";
import { createProjectSchema } from "../middlewares/schemas/createProject.schema";

const router = Router();

// /api/v1/project
router.post("/:workspaceId", validate(createProjectSchema), createProject);

export default router;
