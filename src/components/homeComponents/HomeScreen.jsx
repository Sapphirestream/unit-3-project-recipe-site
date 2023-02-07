import axios from 'axios'
import React from 'react'
import AdBanner from './AdBanner'
import {useState, useEffect} from 'react'
import RecipeCard from '../recipeComponents/RecipeCard'
import { BiSearchAlt2} from 'react-icons/bi'

const HomeScreen = () => {  

  const [recipes, setRecipes] = useState([])
  const [search, setSearch] = useState("");
  const [display, setDisplay] = useState([])

  const getRecipesHandler = () => {
    axios.get("https://recipes.devmountain.com/recipes").then((res) => { 
    setRecipes(res.data)
    console.log("get recipe handler")
    })
  }

  useEffect( ()=> {getRecipesHandler()}, [])

  useEffect( () => {

    console.log("filter recipes")

    const filtered = recipes.filter((recipe) => { 
      let title = recipe.recipe_name.toLowerCase();
      let searchParam = search.toLowerCase();
      return title.includes(searchParam)})

      //onsole.log(filtered)
      setDisplay(filtered.map((recipe) => { return <RecipeCard recipe={recipe}/>}))

  }, [search, recipes])

  return (
    <>
      <AdBanner />
      <div className="recipe-wrap">
      <span className="search-ctn">
        <BiSearchAlt2 size="2em" color="#DA7635" />
        <input className="search-bar" placeholder="Search for a Recipe" onChange={(e) => setSearch(e.target.value)} value={search}/>
      </span>
      <div className="recipe-display">
        {display}
      </div>
      </div>
    </>
  )
}

export default HomeScreen