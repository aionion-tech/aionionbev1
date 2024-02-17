import Multer from "multer";
import * as MulterGoogleCloudStorage from "multer-google-storage";
import { envConfig } from "../config";

export const uploadHandler = Multer({
  storage: MulterGoogleCloudStorage.storageEngine({
    autoRetry: true,
    bucket: envConfig.GCP.GCP_BUCKET_NAME,
    projectId: envConfig.GCP.GCP_PROJECT_ID,
    keyFilename: envConfig.GCP.GCP_KEY,

    filename: (req, file, cb) => {
      const { workspaceId, projectId, datasetId } = req.params;
      const rootFolder = "uploads";
      const folderName = `${rootFolder}/${workspaceId}/${projectId}/${datasetId}`;
      const fullPath = `${folderName}/${Date.now()}-${file.originalname}`;
      cb(null, fullPath);
    },

    acl: "publicRead",
    contentType: (req, file) => {
      return file.mimetype;
    },
  }),
  limits: {
    fileSize: 25 * 1024 * 1024,
  },
});
