import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import classes from "./DetailScreen.module.css";

const DUMMY_RECIPE = {
  recipe_name: "Rosemary Seared Steak",
  recipe_id: 2,
  image_url: "help",
  cook_time: "30 Minutes",
  prep_time: "15 minutes",
  serves: "2 people",
  instructions: "DUMMY STEAK",
  //ingredients: "DUMMY INGREDIENTS",
};

const DetailScreen = () => {
  const params = useParams();
  const { id } = params;
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState("");

  useEffect(() => {
    axios
      .get(`https://recipes.devmountain.com/recipes/${id}`)
      .then((res) => setRecipe(res.data));
  }, []);

  const {
    recipe_name,
    recipe_id,
    image_url,
    cook_time,
    prep_time,
    serves,
    instructions,
  } = recipe;

  return (
    <>
      <header
        className={classes["detail-header"]}
        style={{
          background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.8),
          rgba(0, 0, 0, 0.8)),
          url(${image_url})`,
        }}
      >
        <h1>{recipe_name}</h1>
      </header>
      <main className={classes["detail-main"]}>
        <aside>
          <h2>Recipe</h2>
          <h4>Prep Time: {prep_time}</h4>
          <h4>Cook Time: {cook_time}</h4>
          <h4>Serves: {serves}</h4>
          <h2>Ingredients</h2>
          <>
            {recipe.ingredients &&
              recipe.ingredients.map((ing, index) => {
                return (
                  <h4>
                    {ing.quantity} {ing.ingredient}
                  </h4>
                );
              })}
          </>
        </aside>
        <article>
          <h2>Instructions</h2>
          <p style={{ whiteSpace: "pre-wrap" }}>
            {recipe.instructions && JSON.parse(recipe.instructions)}
          </p>
        </article>
      </main>
    </>
  );
};

export default DetailScreen;
