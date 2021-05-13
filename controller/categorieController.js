const Categorie = require("../models/Categorie");
const { validationResult } = require("express-validator");

exports.newCategorie = async (req, res) => {
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ mistakes: mistakes.array() });
  }

  try {
    const categorie = new Categorie(req.body);
    categorie.save();
    res.json(categorie);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.getCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.find({ categorie: req.categorie }).sort({
      record: -1,
    });
    res.json({ categorie });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

exports.updateCategorie = async (req, res) => {
  const mistakes = validationResult(req);
  if (!mistakes.isEmpty()) {
    return res.status(400).json({ mistakes: mistakes.array() });
  }

  const { name } = req.body;
  const categorieNew = {};

  if (name) {
    categorieNew.name = name;
  }

  try {
    let categorie = await Categorie.findById(req.params.id);

    if (!categorie) {
      return res.status(404).json({ msg: "Categoria no encontrado " });
    }

    categorie = await Categorie.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: categorieNew },
      { new: true }
    );

    res.json({ categorie });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    let categorie = await Categorie.findById(req.params.id);

    if (!categorie) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    await Categorie.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "Categoria eliminada" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
