import { NextFunction, Request, Response } from "express";

const whitelistFields = (allowedFields: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = Object.fromEntries(
      Object.entries(req.body).filter(([key]) => allowedFields.includes(key))
    );
    next();
  };
};

export default whitelistFields;
