import { Request, Response, NextFunction } from "express";
import { DatasetItemModel } from "../models/DatasetItem.model";

export const getDatasetItems = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { workspaceId, projectId, datasetId } = req;

    const datasetItems = await DatasetItemModel.findAll({
      where: {
        workspace: workspaceId,
        project: projectId,
        dataset: datasetId,
      },
    });

    res.status(200).json({
      data: datasetItems,
      message: "Dataset items found",
    });
  } catch (error) {
    next(error);
  }
};

export const createDatasetItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { file, workspaceId, projectId, datasetId } = req;

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
