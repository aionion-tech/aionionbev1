import express from "express";

declare global {
  namespace Express {
    interface Request {
      workspaceId?: number;
      projectId?: number;
      datasetId?: number;
      datasetSettingsId?: number;
      userId?: number;
      file?: any;
    }
  }
}
