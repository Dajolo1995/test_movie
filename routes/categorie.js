const express = require("express");
const router = express.Router();
const categorieController = require("../controller/categorieController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

router.post(
  "/",
  auth,
  [check("name", "El nombre de la categoria no es valido").not().isEmpty()],
  categorieController.newCategorie
);

router.get("/", auth, categorieController.getCategorie);

router.put(
  "/:id",
  auth,
  [check("name", "El nombre de la categoria es obligatorio").not().isEmpty()],
  categorieController.updateCategorie
);

router.delete("/:id", auth, categorieController.deleteCategorie);

module.exports = router;
