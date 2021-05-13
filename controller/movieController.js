const Movies = require("../models/Movies");
const Categorie = require("../models/Categorie");
const { validationResult } = require("express-validator");

exports.newMovie = async (req, res) => {
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ mistakes: mistakes.array() });
  }

  const { categorie } = req.body;

  try {
    const categorieExists = await Categorie.findById(categorie);
    if (!categorieExists) {
      return res.status(404).json({ msg: "Categoria no encontrado" });
    }
    const movie = await Movies(req.body);
    await movie.save();
    res.json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getMovie = async (req, res) => {
  try {
    const { categorie } = req.body;
    const categorieExists = await Categorie.findById(categorie);
    if (!categorieExists) {
      return res.status(404).json({ msg: "Categoria no encontrado" });
    }

    const movie = await Movies.find({}).populate("categorie");
    res.json(movie);
    res.json;
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const { categorie, name, director } = req.body;

    let movie = await Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: "Movie no existe" });
    }

    const categorieExists = await Categorie.findById(categorie);

    if (!categorieExists) {
      return res.status(404).json({ msg: "Categoria no encontrado" });
    }

    const movieNew = {};

    if (name) movieNew.name = name;
    if (director) movieNew.director = director;

    movie = await Movies.findByIdAndUpdate({ _id: req.params.id }, movieNew, {
      new: true,
    });
    res.json({ movie });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const { categorie } = req.body;

    let movie = await Movies.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({ msg: "Movie no existe" });
    }

    const categorieExists = await Categorie.findById(categorie);

    if (!categorieExists) {
      return res.status(404).json({ msg: "Categoria no encontrado" });
    }

    await Movies.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "la peicula ha sido eliminda" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
