import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/User.model";
import { WorkspaceModel } from "../models/Workspace.model";
import { ProjectModel } from "../models/Project.model";
import { DatasetModel } from "../models/Dataset.model";
import { WorkspaceUserModel } from "../models/WorkspaceUser.model";
import { ProjectUserModel } from "../models/ProjectUser.model";
import { envConfig } from "../config";

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

    const accessToken: string = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        envConfig.jwt.JWT_SECRET!,
        {
          expiresIn: "12h",
        },
        (err, token) => {
          if (err) {
            reject();
          }
          resolve(token);
        }
      );
    });

    const accessTokenExpiresIn = (jwt.decode(accessToken) as JwtPayload).exp;

    const refreshToken: string = await new Promise((resolve, reject) => {
      jwt.sign(
        { id: user.id },
        envConfig.jwt.JWT_SECRET!,
        {
          expiresIn: "12h",
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token);
        }
      );
    });

    const refreshTokenExpiresIn = (jwt.decode(refreshToken) as JwtPayload).exp;

    const workspace = await WorkspaceUserModel.findOne({
      where: { user: user.id },
    });

    res.status(200).json({
      accessToken,
      refreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
      workspaceId: workspace?.id,
      userId: user.id,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body;

  try {
    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token required",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, envConfig.jwt.JWT_SECRET!);
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const userId = decoded.id;

    const newAccessToken = jwt.sign({ id: userId }, envConfig.jwt.JWT_SECRET, {
      expiresIn: "12h",
    });

    const accessTokenExpiresIn = (jwt.decode(newAccessToken) as JwtPayload).exp;

    const newRefreshToken = jwt.sign({ id: userId }, envConfig.jwt.JWT_SECRET, {
      expiresIn: "12h",
    });

    const refreshTokenExpiresIn = (jwt.decode(newRefreshToken) as JwtPayload)
      .exp;

    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiresIn,
      refreshTokenExpiresIn,
    });
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

export const encodeJwt = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const token = jwt.sign({ id: user.email }, envConfig.jwt.JWT_SECRET, {
      expiresIn: "10m",
    });
  } catch (error) {
    next(error);
  }
};
