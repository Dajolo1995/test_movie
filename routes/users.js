const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const usersController = require("../controller/usersController");

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "Ingrese un correo").isEmail(),
    check("password", "El password debe ser minimo de 6 caracteres").isLength({
      min: 6,
    }),
  ],
  usersController.newUser
);

module.exports = router;
