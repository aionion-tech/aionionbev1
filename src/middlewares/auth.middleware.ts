import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    if (!payload) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.userId = (payload as JwtPayload).id;
    next();
  } catch (error) {
    next(error);
  }
};
