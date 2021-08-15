const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config();

router.get("/textSearch", (req, res) => {
  const search = req.query.q;
  console.log("searching for,", search);
  axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.spoon_Key}&query=${search}&number=3`
    )
    .then((results) => {
      console.log("Spoonacular querySearch results", results.data);
      res.send(results.data.results);
    })
    .catch((error) => {
      console.log("error query searching spoonacular", error);
      res.sendStatus(500);
    });
});

router.get("/recipe/:id", (req, res) => {
  const recipeId = req.params.id;

  axios
    .get(
      `https://api.spoonacular.com/recipes/${recipeId}/information?includeNutrition=false&apiKey=${process.env.spoon_Key}`
    )
    .then((results) => {
      console.log("Spoonacular recipeId results", results.data);
      res.send(results.data);
    })
    .catch((error) => {
      console.log("error getting recipe based on id", error);
    });
});

module.exports = router;