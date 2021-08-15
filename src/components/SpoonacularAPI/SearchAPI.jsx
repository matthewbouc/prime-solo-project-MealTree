import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SpoonacularSearch() {
  const dispatch = useDispatch();
  const history = useHistory();
  const recipeSearchList = useSelector((store) => store.spoon.recipeSearchList);

  const [searchQuery, setSearchQuery] = useState("");

  const handleQuerySearch = () => {
    console.log(searchQuery);
    axios
      .get(`/api/spoonacular/textSearch?q=${searchQuery}`)
      .then((response) => {
        dispatch({
          type: "SET_SPOON_QUERY",
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log("error GETting recipes", error);
      });
  };

  const handleRecipeClick = (recipeId) => {
    console.log("recipe clicked", recipeId);
    axios
      .get(`/api/spoonacular/recipe/${recipeId}`)
      .then((response) => {
        dispatch({
          type: "SET_SPOON_ID",
          payload: response.data,
        });
        history.push(`/recipe_details/${recipeId}`);
      })
      .catch((error) => {
        console.log("error GETting recipe by id", error);
      });
  };

  return (
    <>
      <input
        type='text'
        value={searchQuery}
        placeholder='Search Recipes'
        onChange={(event) => setSearchQuery(event.target.value)}
      ></input>
      <button type='button' onClick={() => handleQuerySearch()}>
        Search
      </button>
      {recipeSearchList &&
        recipeSearchList.map((recipe) => {
          return (
            <div key={recipe.id}>
              <p>{recipe.title}</p>
              <img
                src={recipe.image}
                onClick={() => handleRecipeClick(recipe.id)}
                width='300px'
                height='auto'
              />
            </div>
          );
        })}
    </>
  );
}

export default SpoonacularSearch;
