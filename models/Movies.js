const mongoose = require("mongoose");

const MovieShema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",
  },
  record: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Movie", MovieShema);
