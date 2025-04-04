import { Router } from "express";
import * as userController from "../controller/user.controller";
import {
  loginValidator,
  registrationValidator,
} from "../validator/user.validator";
import validateRequest from "../middleware/validateRequest.middleware";
import whitelistFields from "../middleware/whitelistRequest.middleware";
import verifyRefreshToken from "../middleware/refreshTokenVerification.middleware";
import verifyAccessToken from "../middleware/accessTokenVerification.middleware copy";

const router = Router();

router
  .route("/register")
  .post(
    verifyAccessToken,
    registrationValidator,
    validateRequest,
    whitelistFields(["first_name", "last_name", "username", "password"]),
    userController.registerUser
  );
router
  .route("/login")
  .post(
    loginValidator,
    validateRequest,
    whitelistFields(["username", "password"]),
    userController.loginUser
  );

router.route("/refresh").get(verifyRefreshToken, userController.refresh);

export default router;
