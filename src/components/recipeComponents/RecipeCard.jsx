import React from "react";
import {useNavigate} from 'react-router-dom'

import classes from "./RecipeCard.module.css";



const RecipeCard = (recipe) => {

  const navigate = useNavigate();

  const {recipe_name, recipe_id, image_url} = recipe.recipe;

  //put in a filter for empty recipes here

  const recipeClickHandler = () => {
    navigate(`/recipes/${recipe_id}`)
  }

  return (
    <div className={classes['recipe-ctn']}>
      <img
        className={classes["recipe-img"]}
        src={image_url}
      />
    <h1 className={classes['recipe-title']}>{recipe_name}</h1>
    <button className='blue-btn' onClick={recipeClickHandler}>See More</button>
    </div>
  );
};

export default RecipeCard;