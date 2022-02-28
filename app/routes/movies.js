const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.js");
const movie = require("../models/movie");

router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getMovie, (req, res) => {
  res.send(req.movie);
});

router.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    img: req.body.img,
  });
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name;
  }
  if (req.body.price != null) {
    res.movie.price = req.body.price;
  }
  if (req.body.category != null) {
    res.movie.category = req.body.category;
  }
  if (req.body.category != null) {
    res.movie.img = req.body.img;
  }
  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Movie Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cannot find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();
}

module.exports = router;
