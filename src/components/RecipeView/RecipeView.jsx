import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DatePicker from '../DatePicker/DatePicker';


function RecipeView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {recipeId} = useParams();

    const recipe = useSelector(store => store.recipe);

    useEffect(() => {
        getRecipeDetails();
    }, [])

    const getRecipeDetails = () => {
        console.log('recipeId', recipeId);
        dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: recipeId
        });
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handlePlanIt = (event, id) => {
        event.stopPropagation();
        handleClickOpen();
      }

    return (
    <div>
        <Button onClick={() => history.goBack()}>Back</Button>
        <Box>
            <Typography>{recipe.name}</Typography>
            <img src={recipe.picture} width="400px"/>
            <Typography>{recipe.ingredients}</Typography>
            <Typography>{recipe.procedure}</Typography>
        </Box>
        <Button variant="contained"
            onClick={(event) => handlePlanIt(event, recipe.id)}
            onFocus={(event) => event.stopPropagation()}
        >Plan It</Button>
        <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
    </div>
    );
}

export default RecipeView;