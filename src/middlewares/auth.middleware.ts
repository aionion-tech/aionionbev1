import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envConfig } from "../config";

function verifyToken(token, secret) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    const refreshToken = req.headers.refreshtoken;

    if (!accessToken) {
      return res.status(401).json({
        message: "Access token required",
      });
    }

    try {
      const payload = await verifyToken(accessToken, envConfig.jwt.JWT_SECRET);
      req.userId = (payload as JwtPayload).id;
      return next();
    } catch (error) {
      if (error.name === "TokenExpiredError" && refreshToken) {
        console.log(refreshToken);
        try {
          const newPayload = await verifyToken(
            refreshToken,
            envConfig.jwt.JWT_SECRET
          );
          const newAccessToken = jwt.sign(
            { id: (newPayload as JwtPayload).id },
            envConfig.jwt.JWT_SECRET,
            { expiresIn: "12h" }
          );

          const newRefreshToken = jwt.sign(
            { id: (newPayload as JwtPayload).id },
            envConfig.jwt.JWT_SECRET,
            { expiresIn: "12h" }
          );

          res.setHeader("accessToken", newAccessToken);
          res.setHeader("refreshToken", newRefreshToken);

          req.userId = (newPayload as JwtPayload).id;
          return next();
        } catch {
          return res.status(403).json({ message: "Invalid refresh token" });
        }
      } else {
        return res.status(403).json({ message: "Invalid access token" });
      }
    }
  } catch (error) {
    return next(error);
  }
};
