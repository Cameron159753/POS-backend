const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  img: {
    type: Object,
    required: true,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
