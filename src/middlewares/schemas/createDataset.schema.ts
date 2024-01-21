import { z } from "zod";

export const createDatasetSchema = z.object({
  name: z.string(),
});
