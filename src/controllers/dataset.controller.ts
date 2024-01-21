import { NextFunction, Request, Response } from "express";
import { DatasetModel } from "../models/Dataset.model";

export const createDataset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, workspace, project } = req.body;

    const dataset = await DatasetModel.create({
      name,
      workspace,
      project,
    });

    res.status(201).json({
      dataset,
      message: "Dataset created",
    });
  } catch (error) {
    next(error);
  }
};
