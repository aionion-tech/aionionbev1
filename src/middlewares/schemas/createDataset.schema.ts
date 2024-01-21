import { z } from "zod";

export const createDatasetSchema = z.object({
  name: z.string(),
  workspace: z.number(),
  project: z.number(),
});
