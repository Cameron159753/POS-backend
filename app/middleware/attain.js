const Movie = require("../models/movie");

getMovie = async (req, res, next) => {
  let movie;
  try {
    movie = await Movie.findById(req.params._id);
    if (movie == null) {
      return res.status(404).json({ message: "cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  req.cart = decoded.cart;
  next();
};

module.exports = getMovie;
