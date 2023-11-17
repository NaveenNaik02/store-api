import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(500).json({ msg: "internal server error" });
};

export default errorHandler;
