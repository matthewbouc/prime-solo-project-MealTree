import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from '../DatePicker/DatePicker';


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
    dispatch({ type: 'SET_RECIPE_DETAILS', payload: {}});
    history.push(`/recipe/${id}`);
  }
  
  return (
    <div>
    <Button onClick={() => history.goBack()}>Back</Button>
    {favorites && favorites.map((recipe, i) => {     
      return(
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-label="Expand"
            aria-controls="additional-actions1-content"
            id="additional-actions1-header"
          >
            <Typography>{recipe.name}</Typography>
            <img src={recipe.picture} width="100px"/>
            <Button
            onClick={(event) => handlePlanIt(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
            >Plan It</Button>
            <Button
            onClick={(event) => handleViewRecipe(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
              >View Recipe</Button>
          </AccordionSummary>
          <AccordionDetails>
              {recipe.ingredients}
          </AccordionDetails>
        </Accordion>
      )
    })}

    <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
  </div>
  );
}

export default Favorites;
