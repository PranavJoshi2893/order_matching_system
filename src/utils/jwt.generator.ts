import { sign } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

async function accessTokenGenerator(payload: IPayload) {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      `[${new Date().toString()}] error: Invalid environment variable/s`
    );
  }

  return await sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
}

async function refreshTokenGenerator(payload: IPayload) {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      `[${new Date().toString()}] error: Invalid environment variable/s`
    );
  }

  return await sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
}

export { accessTokenGenerator, refreshTokenGenerator };
