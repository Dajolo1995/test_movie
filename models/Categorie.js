const mongoose = require("mongoose");

const CategorieShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  record: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Categorie", CategorieShema);
