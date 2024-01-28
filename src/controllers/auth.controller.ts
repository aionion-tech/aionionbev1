import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User.model";
import { WorkspaceModel } from "../models/Workspace.model";
import { ProjectModel } from "../models/Project.model";
import { DatasetModel } from "../models/Dataset.model";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";
import { ProjectUserModel } from "../models/ProjectUser.model";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password, email } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const newUser = await UserModel.create({
      username,
      password,
      email,
    });

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const accessToken = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        }
      );
    });

    const refreshToken = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET!,
        {
          expiresIn: "7d",
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });

    const workspace = await WorkspaceUserModel.findOne({
      where: { user: user.id },
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      workspaceId: workspace?.id,
      userId: user.id,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (!payload) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    res.status(200).json(payload);
  } catch (error) {
    next(error);
  }
};

export const verifyPermissions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userid } = req.headers;

    const { workspaceId, projectId, datasetId } = req.body;

    if (!userid || !workspaceId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const workspace = await WorkspaceModel.findOne({
      where: { id: workspaceId, owner: userid },
    });

    if (!workspace) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const workspaceUser = await WorkspaceUserModel.findOne({
      where: { workspace: workspaceId, user: userid },
    });

    if (!workspaceUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const project = await ProjectModel.findOne({
      where: { id: projectId, workspace: workspaceId },
    });

    if (!project) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const projectUser = await ProjectUserModel.findOne({
      where: { id: projectId, user: userid },
    });

    if (!projectUser) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (datasetId) {
      const dataset = await DatasetModel.findOne({
        where: { id: datasetId, project: projectId },
      });

      if (!dataset) {
        return res.status(401).json({
          message: "Unauthorized",
        });
      }
    }

    res.status(200).json({
      message: "Authorized",
    });
  } catch (error) {
    next(error);
  }
};
