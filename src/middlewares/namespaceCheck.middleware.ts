import { NextFunction, Request, Response } from "express";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";
import { ProjectUserModel } from "../models/ProjectUser.model";
import { DatasetModel } from "../models/Dataset.model";
import { DatasetSettingsModel } from "../models/DatasetSettings.model";

export const namespaceCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { workspaceId, projectId, datasetId, datasetSettingsId } = req.params;

    if (workspaceId) {
      const workspaceUser = await WorkspaceUserModel.findOne({
        where: {
          workspace: parseInt(workspaceId),
          user: userId,
        },
      });

      if (!workspaceUser) throw new Error("Workspace not found");
      req.workspaceId = parseInt(workspaceId);
    }

    if (projectId) {
      const projectUser = await ProjectUserModel.findOne({
        where: {
          project: parseInt(projectId),
          user: userId,
        },
      });

      if (!projectUser) throw new Error("Project not found");

      req.projectId = parseInt(projectId);
    }

    if (datasetId) {
      const dataset = await DatasetModel.findOne({
        where: {
          id: parseInt(datasetId),
          project: parseInt(projectId),
        },
      });

      if (!dataset) throw new Error("Dataset not found");

      req.datasetId = parseInt(datasetId);
    }

    if (datasetSettingsId) {
      const datasetSettings = await DatasetSettingsModel.findOne({
        where: {
          id: parseInt(datasetSettingsId),
        },
      });

      if (!datasetSettings) throw new Error("Dataset settings not found");

      req.datasetSettingsId = parseInt(datasetSettingsId);
    }

    next();
  } catch (error) {
    next(error);
  }
};
