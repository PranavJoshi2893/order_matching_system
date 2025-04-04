import { Request, Response } from "express";
import * as userService from "../service/user.service";
import { AppError } from "../utils/error";

async function registerUser(req: Request, res: Response) {
  try {
    const result = await userService.registerUser(req.body);
    return res.status(201).json(result);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ message: "Internal Server error" });
  }
}

async function loginUser(req: Request, res: Response) {
  try {
    const result = await userService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ message: "Internal Server error" });
  }
}

async function refresh(req: Request, res: Response) {
  try {
    const result = await userService.refresh({ sub: req.body.payload["sub"] });
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ message: "Internal Server error" });
  }
}

export { registerUser, loginUser, refresh };
