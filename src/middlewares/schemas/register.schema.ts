import { z } from "zod";

export const regiserSchema = z.object({
  username: z.string().min(3).max(30),
  password: z.string().min(8).max(30),
  email: z.string().email(),
});
