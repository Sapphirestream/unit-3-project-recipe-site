import React from "react";
import classes from "./NewRecipeScreen.module.css";
import { useState } from "react";
import { Formik } from "formik";
import axios from "axios";

const NewRecipeScreen = () => {
  const [ingredients, setIngredients] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const initialValues = {
    type: "",
    recipeName: "",
    imageURL: "",
    prepTime: "",
    cookTime: "",
    serves: "",
    ingredients: [],
    instructions: "",
  };

  const onSubmit = (values) => {
    values.ingredients = ingredients;
    console.log(values);
    console.log(values.type);

    axios.post("https://recipes.devmountain.com/recipes", values).then(() => {
      console.log("successfully sent");
    });
  };

  const addIngredient = () => {
    setIngredients((prevIngred) => {
      return [...prevIngred, { name, quantity }];
    });
    setName("");
    setQuantity("");
  };

  return (
    <main className={classes["new-recipe-main"]}>
      <h1>Tell us about your Recipe!</h1>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={values.recipeName}
                  onChange={handleChange}
                  name="recipeName"
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={values.imageURL}
                  onChange={handleChange}
                  name="imageURL"
                />
              </div>
              <div className={classes["radio-hold"]}>
                <div>
                  <input
                    type="radio"
                    id="cook"
                    value="Cook"
                    onChange={handleChange}
                    name="type"
                  />
                  <label for="cook">Cook</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="bake"
                    value="Bake"
                    onChange={handleChange}
                    name="type"
                  />
                  <label for="bake">Bake</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="drink"
                    value="Drink"
                    onChange={handleChange}
                    name="type"
                  />
                  <label for="drink">Drink</label>
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Prep Time"
                  value={values.prepTime}
                  onChange={handleChange}
                  name="prepTime"
                />
                <input
                  type="text"
                  placeholder="Cook Time"
                  value={values.cookTime}
                  onChange={handleChange}
                  name="cookTime"
                />
                <input
                  type="text"
                  placeholder="Serves"
                  value={values.serves}
                  onChange={handleChange}
                  name="serves"
                />
              </div>
              <section className={classes["ing-ctn"]}>
                <div>
                  <input
                    type="text"
                    placeholder="Ingredient"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <ul>
                  {ingredients.map((item) => {
                    return (
                      <li>
                        {item.quantity} {item.name}
                      </li>
                    );
                  })}
                </ul>
              </section>
              <div className={classes["btn-hold"]}>
                <button
                  type="button"
                  className="orange-btn"
                  onClick={addIngredient}
                >
                  Add Another
                </button>
                <textarea
                  type="text"
                  placeholder="What are the instructions?"
                  value={values.instructions}
                  onChange={handleChange}
                  name="instructions"
                />
                <button className="blue-btn" type="submit">
                  Save
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </main>
  );
};

export default NewRecipeScreen;
