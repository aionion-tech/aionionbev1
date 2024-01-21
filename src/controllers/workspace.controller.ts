import { WorkspaceModel } from "../models/Workspace.model";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";
import { UserRoles } from "../enums/UserRoles.enum";
import { NextFunction, Request, Response } from "express";

export const createWorkspace = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req;
    const { name } = req.body;

    const workspace = await WorkspaceModel.create({
      name,
      owner: userId,
    });

    await WorkspaceUserModel.create({
      workspace: workspace.id,
      user: userId,
      role: UserRoles.OWNER,
    });

    res.status(201).json({
      workspace,
      message: "Workspace created",
    });
  } catch (error) {
    next(error);
  }
};
