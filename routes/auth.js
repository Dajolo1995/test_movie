const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const authController = require("../controller/authController");

router.post(
  "/",
  [
    check("email", "Ingrese un correo").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  authController.authUser
);

module.exports = router;
