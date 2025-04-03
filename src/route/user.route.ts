import { Router } from "express";
import * as userController from "../controller/user.controller";
import {
  loginValidator,
  registrationValidator,
} from "../validator/user.validator";
import validateRequest from "../middleware/validateRequest.middleware";
import whitelistFields from "../middleware/whitelistRequest.middleware";

const router = Router();

router
  .route("/")
  .post(
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

export default router;
