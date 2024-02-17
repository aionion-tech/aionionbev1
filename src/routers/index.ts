import { Router } from "express";
import authRouter from "./auth.router";
import workspaceRouter from "./workspace.router";
import projectRouter from "./project.router";
import datasetRouter from "./dataset.router";
import datasetItemRouter from "./datasetItem.router";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

// /api/v1/auth
router.use("/auth", authRouter);

// /api/v1/workspace
router.use("/workspace", auth, workspaceRouter);

// /api/v1/project
router.use("/project", auth, projectRouter);

// /api/v1/dataset
router.use("/dataset", auth, datasetRouter);

// /api/v1/datasetitem
router.use("/datasetitem", datasetItemRouter);

export default router;
