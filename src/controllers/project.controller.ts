import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../models/Project.model";
import { ProjectUserModel } from "../models/ProjectUser.model";
import { UserRoles } from "../enums/UserRoles.enum";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { workspaceId } = req.params;
    const { name } = req.body;

    const WorkspaceUser = await WorkspaceUserModel.findOne({
      where: {
        workspace: parseInt(workspaceId),
        user: userId,
      },
    });

    if (!WorkspaceUser) throw new Error("Workspace not found");

    const project = await ProjectModel.create({
      name,
      workspace: parseInt(workspaceId),
    });

    await ProjectUserModel.create({
      workspace: parseInt(workspaceId),
      project: project.id,
      role: UserRoles.OWNER,
      user: userId,
    });

    res.status(201).json({
      project,
      message: "Project created",
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId } = req.params;

    const projects = await ProjectModel.findAll({
      where: {
        workspace: parseInt(workspaceId),
      },
    });

    return res.status(200).json({
      projects,
    });
  } catch (error) {
    next(error);
  }
};
