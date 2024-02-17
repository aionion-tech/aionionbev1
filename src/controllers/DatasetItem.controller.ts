import { Request, Response, NextFunction } from "express";
import { DatasetItemModel } from "../models/DatasetItem.model";

export const createDatasetItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, file, workspaceId, projectId, datasetId } = req;

    console.log(file);

    if (!file) throw new Error("File not found");

    const datasetItem = await DatasetItemModel.create({
      name: file.originalname,
      workspace: workspaceId,
      project: projectId,
      dataset: datasetId,
      type: file.mimetype,
      url: file.path,
      value: file.filename,
      annotations: JSON.stringify([]),
    });

    res.status(201).json({
      data: datasetItem,
      message: "Dataset created",
    });
  } catch (error) {
    next(error);
  }
};
