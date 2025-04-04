import { JwtPayload, verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utils/error";

function verifyRefreshToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) throw new UnauthorizedError(`error: Invalid bearer token`);

  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      `[${new Date().toString()}] error: Invalid environment variable/s`
    );
  }

  verify(token, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
    if (err) {
      throw new UnauthorizedError(
        `[${new Date().toString()}] error: ${err.message}`
      );
    }

    req.body.payload = data as JwtPayload;

    next();
  });
}

export default verifyRefreshToken;
