import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  calendarItem: {
    backgroundColor: "#ACC8AB",
    height: "125px",
    marginBottom: "10px",
    borderRadius: "5px",
    boxShadow: "0 3px 5px 4px rgba(0, 0, 0, 0.3)",
  },
  searchArea: {
    backgroundColor: "#ACC8AB",
    width: "90%",
    justifyContent: "center",
    marginBottom: '30px',
    paddingBottom: '10px',
    borderRadius: "5px",
  },
});

function SearchAPI() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

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
        history.push(`/apiRecipe/${recipeId}`);
      })
      .catch((error) => {
        console.log("error GETting recipe by id", error);
      });
  };

  return (
    <div className='standardBackground'>
    <Grid container justifyContent='center'>
    <Grid container item className={classes.searchArea}>
      <Grid container justifyContent='center' style={{marginBottom: '20px'}}>
        <Typography variant='h6'>Spoonacular</Typography>
      </Grid>
      <Grid container justifyContent="center">
      <Grid item>
      <Input
        color="primary"
        autoFocus
        value={searchQuery}
        placeholder='Search Recipes'
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      </Grid>
      <Grid item>
      <SearchIcon fontSize='medium' onClick={() => handleQuerySearch()} />
        {/* Search
      </Button> */}
      </Grid>
      </Grid>
      </Grid>
      </Grid>
      <Grid container spacing={1} justifyContent='center'>
      {recipeSearchList &&
        recipeSearchList.map((recipe, i) => {
          return (
            <Grid
              key={i}
              item
              xs={11}
              container
              className={classes.calendarItem}
              alignContent='center'
              justifyContent='center'
            >
              <Grid item xs={5} container alignContent="center">
                <img
                  src={recipe.image}
                  onClick={() => handleRecipeClick(recipe.id)}
                  width='150px'
                />
              </Grid>
              <Grid item xs={5} container alignContent="center">
                {recipe.title}
              </Grid>
              <Grid item xs={2}>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default SearchAPI;
