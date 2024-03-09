import { NextFunction, Request, Response } from "express";
import { DatasetSettingsModel } from "../models/DatasetSettings.model";

export const getDatasetSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { datasetId } = req;

    const datasetSettings = await DatasetSettingsModel.findOne({
      where: { dataset: datasetId },
    });

    res.status(200).json({
      data: datasetSettings,
      message: "Dataset settings found",
    });
  } catch (error) {
    next(error);
  }
};

export const updateDatasetSettings = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { datasetId } = req;
    const { name, description, labels } = req.body;

    const datasetSettings = await DatasetSettingsModel.findOne({
      where: { dataset: datasetId },
    });

    datasetSettings.ontology = JSON.stringify({
      name,
      description,
      labels,
    });
    await datasetSettings.save();

    res.status(200).json({
      data: datasetSettings,
      message: "Dataset settings updated",
    });
  } catch (error) {
    next(error);
  }
};
