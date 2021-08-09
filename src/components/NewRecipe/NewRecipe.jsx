import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


function NewRecipe() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [recipe, setRecipe] = useState({name: '', ingredients: '', procedure: '', picture: ''});
  
  const handleAddRecipe = () => {
    console.log('recipe', recipe);
    dispatch({type: 'ADD_NEW_RECIPE', payload: recipe})
  }

  return (
    <Box>
      <form className={classes.root} autoComplete="off" onSubmit={handleAddRecipe}>
        <TextField required value={recipe.name} label="Recipe Name" variant="outlined" onChange={(event)=> setRecipe({...recipe, name: event.target.value})}/>
        <TextareaAutosize required value={recipe.ingredients} aria-label="minimum height" minRows={8} placeholder="Ingredients" onChange={(event)=> setRecipe({...recipe, ingredients: event.target.value})} />
        <TextareaAutosize required value={recipe.procedure} aria-label="minimum height" minRows={15} placeholder="Procedure" onChange={(event)=> setRecipe({...recipe, procedure: event.target.value})} />
        <TextField value={recipe.picture} label="Picture URL - change to dropzone" variant="outlined" onChange={(event)=> setRecipe({...recipe, picture: event.target.value})}/>
        <Button variant="contained" type="submit" >Add Recipe</Button>
      </form>
    </Box>
  );
}

export default NewRecipe;