import { body } from "express-validator";

const registrationValidator = [
  body("first_name")
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage(
      "First name must contain only alphabetic characters (A-Z, a-z)"
    )
    .trim()
    .escape(),
  body("last_name")
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only alphabetic characters (A-Z, a-z)")
    .trim()
    .escape(),
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage(
      "Username must contain only letters and numbers (A-Z, a-z, 0-9)"
    )
    .trim()
    .escape()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    )
    .trim(),
];

const loginValidator = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isAlphanumeric()
    .withMessage(
      "Username must contain only letters and numbers (A-Z, a-z, 0-9)"
    )
    .trim()
    .escape()
    .toLowerCase(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password must be at least 8 characters long and include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    )
    .trim(),
];

export { registrationValidator, loginValidator };
