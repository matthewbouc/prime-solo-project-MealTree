import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import FormControl from "@material-ui/core/FormControl";
import Box from "@material-ui/core/Box";
import { Grid, Typography } from "@material-ui/core";
import "./NewRecipe.css";
import "../App/App.css";

const useStyles = makeStyles((theme) => ({
  textHeader: {
    textAlign: "center",
    // color: "#442603",
    // paddingTop: "5%",
    paddingBottom: "20px",
  },
}));

function NewRecipe() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: "",
    procedure: "",
    picture: "",
  });

  const handleAddRecipe = (event) => {
    event.preventDefault();
    console.log("recipe", recipe);
    dispatch({ type: "ADD_NEW_RECIPE", payload: recipe });
    setRecipe({ name: "", ingredients: "", procedure: "", picture: "" });
  };

  return (
    <div className='standardBackground'>
      <Typography variant='h6' className={classes.textHeader}>
        Add New Recipe
      </Typography>
      <form className='formNew' autoComplete='off' onSubmit={handleAddRecipe}>
        <Grid container spacing={3} justifyContent='center'>
          <Grid item>
            <TextField
              required
              value={recipe.name}
              label='Recipe Name'
              variant='filled'
              color='secondary'
              style={{ backgroundColor: "lightgrey" }}
              onChange={(event) =>
                setRecipe({ ...recipe, name: event.target.value })
              }
            />
          </Grid>
          <Grid item>
            {/* <TextareaAutosize required  */}
            {/* minRows={8}  */}
            {/* aria-label="minimum height"  */}
            <TextField
              value={recipe.ingredients}
              label='Ingredients'
              variant='filled'
              color='secondary'
              style={{ backgroundColor: "lightgrey" }}
              onChange={(event) =>
                setRecipe({ ...recipe, ingredients: event.target.value })
              }
            />
          </Grid>
          <Grid item>
            {/* <TextareaAutosize required 
        minRows={15} 
        aria-label="minimum height"  */}
            <TextField
              value={recipe.procedure}
              label='Directions'
              variant='filled'
              color='secondary'
              style={{ backgroundColor: "lightgrey" }}
              onChange={(event) =>
                setRecipe({ ...recipe, procedure: event.target.value })
              }
            />
          </Grid>
          <Grid item>
            <TextField
              value={recipe.picture}
              label='Picture URL'
              variant='filled'
              color='secondary'
              style={{ backgroundColor: "lightgrey" }}
              onChange={(event) =>
                setRecipe({ ...recipe, picture: event.target.value })
              }
            />
          </Grid>
          <Grid item container xs={12} justifyContent='center'>
            <Button color='primary' variant='contained' type='submit'>
              Add Recipe
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default NewRecipe;
