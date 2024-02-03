import { NextFunction, Request, Response } from "express";
import { DatasetModel } from "../models/Dataset.model";
import { ProjectUserModel } from "../models/ProjectUser.model";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";

export const createDataset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { workspaceId, projectId } = req.params;
    const { name } = req.body;

    const workspaceUser = await WorkspaceUserModel.findOne({
      where: {
        workspace: parseInt(workspaceId),
        user: userId,
      },
    });

    if (!workspaceUser) throw new Error("Workspace not found");

    const projectUser = await ProjectUserModel.findOne({
      where: {
        project: parseInt(projectId),
        user: userId,
      },
    });

    if (!projectUser) throw new Error("Project not found");

    const dataset = await DatasetModel.create({
      name,
      workspace: parseInt(workspaceId),
      project: parseInt(projectId),
    });

    res.status(201).json({
      dataset,
      message: "Dataset created",
    });
  } catch (error) {
    next(error);
  }
};
