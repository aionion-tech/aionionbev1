import { Router } from "express";
import { signin, signup, refreshToken } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { signupSchema } from "../middlewares/schemas/signup.schema";
import { signinSchema } from "../middlewares/schemas/signin.schema";

const router = Router();

// /api/v1/auth/signup
router.post("/signup", validate(signupSchema), signup);

// /api/v1/auth/signin
router.post("/signin", validate(signinSchema), signin);

// /api/v1/auth/refreshToken
router.post("/refreshToken", refreshToken);

export default router;
