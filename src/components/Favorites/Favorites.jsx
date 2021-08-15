import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DatePicker from '../DatePicker/DatePicker';
import { Box, Grid } from '@material-ui/core';
import '../App/App.css';


function Favorites() {
  const dispatch = useDispatch();
  const history = useHistory();
  const favorites = useSelector(store => store.favoritesList);

  useEffect(() => {
    dispatch({type: 'GET_FAVORITES_LIST'});
  }, [])

  const [recipeId, setRecipeId] = useState('');
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
  setOpen(true);
  };


  const handlePlanIt = (event, id) => {
    event.stopPropagation();
    handleClickOpen();
    setRecipeId(id);
  }

  const handleViewRecipe = (event, id) => {
    event.stopPropagation();
    dispatch({
      type: 'GET_RECIPE_DETAILS',
      payload: id,
      push: history.push,
      isFavorites: true,
    });
    // history.push(`/recipe/${id}`);
  }
  
  return (
    <div className='standardBackground'>
    <Grid container justifyContent="center">
    <Grid item>
      <Typography variant="h6">Favorite Recipes</Typography>
    </Grid>
    <Grid item container xs={11}>
    {/* <Button onClick={() => history.goBack()}>Back</Button> */}
    {favorites && favorites.map((recipe, i) => {     
      return(
        <Accordion key={i} style={{backgroundColor: "#ACC8AB", marginBottom: "10px"}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Grid item container>
            <Grid item xs={4} onClick={(event) => handleViewRecipe(event, recipe.id)}>
              <img src={recipe.picture} width="100px" />
            </Grid>
            <Grid item xs={5} container style={{paddingLeft: "8px", paddingRight: "8px"}} alignContent="center" onClick={(event) => handleViewRecipe(event, recipe.id)}>
            <Typography>{recipe.name}</Typography>
            </Grid>
            <Grid item xs={3} container alignContent="center">
            <Button
            onClick={(event) => handlePlanIt(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
            variant="contained"
            color="secondary"
            style={{maxWidth: "60px"}}
            >Plan</Button>
            {/* <Button
            onFocus={(event) => event.stopPropagation()}
            variant="contained"
            color="secondary"
              >View Recipe</Button> */}
            </Grid>
            </Grid>

          </AccordionSummary>
          <AccordionDetails>
              <Typography>Ingredients: {recipe.ingredients}</Typography>
          </AccordionDetails>
        </Accordion>
      )
    })}

    <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
  </Grid>
  </Grid>
  </div>
  );
}

export default Favorites;
