import { Request, Response, NextFunction } from "express";

const isConstraintError = (err: any) => {
  return err.name === "SequelizeUniqueConstraintError";
};

const isZodError = (err: any) => {
  return err.name === "ZodError";
};

export const rootError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (process.env.NODE_ENV === "development") console.log(err);

  if (isZodError(err)) {
    return res.status(422).json({
      message: err.errors[0].message,
    });
  }

  if (isConstraintError(err)) {
    return res.status(400).json({
      message: err.errors[0].message,
    });
  }

  res.status(500).json({
    message: "Something went wrong",
  });
};
