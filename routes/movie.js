const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const movieController = require("../controller/movieController");
const auth = require("../middleware/auth");

router.post(
  "/",
  auth,
  [
    check("name", "El nombre de la pelicula es obligatorio").not().isEmpty(),
    check("director", "El nombre del director es obligatorio").not().isEmpty(),
    check("categorie", "El nomre de la categoria es obligatorio")
      .not()
      .isEmpty(),
  ],
  movieController.newMovie
);

router.get("/", auth, movieController.getMovie);

router.put("/:id", auth, movieController.updateMovie);

router.delete("/:id", auth, movieController.deleteMovie);

module.exports = router;
