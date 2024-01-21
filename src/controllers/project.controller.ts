import { NextFunction, Request, Response } from "express";
import { ProjectModel } from "../models/Project.model";
import { ProjectUserModel } from "../models/ProjectUser.model";
import { UserRoles } from "../enums/UserRoles.enum";

export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userid } = req.headers;

    const workspaceId = req.params.workspaceId;

    const { name } = req.body;

    console.log(userid, name, workspaceId);

    // const project = await ProjectModel.create({
    //   name,
    //   workspace,
    // });

    // await ProjectUserModel.create({
    //   workspace,
    //   project: project.id,
    //   role: UserRoles.OWNER,
    //   user: parseInt(userid as string),
    // });

    res.status(201).json({
      // project,
      message: "Project created",
    });
  } catch (error) {
    next(error);
  }
};
