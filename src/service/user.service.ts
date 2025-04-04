import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
} from "../utils/error";
import { compare, hash } from "bcrypt";
import prisma from "../config/prisma.config";
import {
  accessTokenGenerator,
  refreshTokenGenerator,
} from "../utils/jwt.generator";

interface IUser {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

async function registerUser(userDetails: IUser) {
  try {
    const { first_name, last_name, username, password } = userDetails;

    const hashedPassword = await hash(password, 10); // Always use salt over rounds

    await prisma.users.create({
      data: {
        first_name,
        last_name,
        username,
        password: hashedPassword,
      },
    });

    return { message: "New user added" };
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === "P2002")
        throw new ConflictError("Username already taken");
    }
    throw new BadRequestError(
      "Something bad happened during user registration"
    );
  }
}

async function loginUser(userDetails: IUser) {
  const { username, password } = userDetails;

  const user = await prisma.users.findUnique({
    where: { username },
    select: { uid: true, username: true, password: true },
  });

  if (!user) throw new NotFoundError("User not found");

  const isPasswdMatched = await compare(password, user.password);

  if (!isPasswdMatched) throw new ForbiddenError("Invalid password");

  const access_token = await accessTokenGenerator({ sub: user.uid });
  const refresh_token = await refreshTokenGenerator({ sub: user.uid });

  return {
    message: "Login Successful!",
    access_token,
    refresh_token,
  };
}

async function refresh(payload: { sub: string }) {
  const access_token = await accessTokenGenerator(payload);

  return { access_token };
}

export { registerUser, loginUser, refresh };
