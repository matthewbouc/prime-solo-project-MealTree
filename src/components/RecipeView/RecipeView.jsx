import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DatePicker from '../DatePicker/DatePicker';
import TextField from '@material-ui/core/TextField';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';


function RecipeView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {recipeId} = useParams();

    useEffect(() => {
        getRecipeDetails();
    }, [])

    const recipe = useSelector(store => store.recipe);
    const [editView, setEditView] = useState(false);
    const [newRecipe, setNewRecipe] = useState({id: recipe.id, name: recipe.name, ingredients: recipe.ingredients, procedure: recipe.procedure, picture: recipe.picture});

    const handleConfirmEdit = (event) => {
        event.preventDefault();
        console.log('newRecipe', newRecipe);
        dispatch({type: 'EDIT_RECIPE', payload: newRecipe})
        setEditView(!editView)
    }


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
    ///////////////CHECK THIS OUT ///////////////////////
    const handlePlanIt = (event, id) => {
        event.stopPropagation();
        handleClickOpen();
    }
    return (
    <div>
        
        <Button variant="contained" onClick={() => history.goBack()}>Back</Button>
        
        {!editView &&
            <>
            <Button variant="contained" onClick={() => setEditView(!editView)}>Edit Recipe</Button>   
            <Box>
                <Typography>{recipe.name}</Typography>
                <img src={recipe.picture} width="400px"/>
                <Typography>{recipe.ingredients}</Typography>
                <Typography>{recipe.procedure}</Typography>
            </Box>
            <Button variant="contained"
                onClick={(event) => handlePlanIt(event, recipe.id)}
            >Plan It</Button></>
        }
        {editView &&
        <>
        <Button variant="contained" onClick={() => setEditView(!editView)}>Cancel</Button>
        <Box>
            <form autoComplete="off" onSubmit={(event)=> handleConfirmEdit(event)}>
                <TextField required value={newRecipe.name} label="Recipe Name" variant="outlined" onChange={(event)=> setNewRecipe({...newRecipe, name: event.target.value})}/>
                <TextField value={newRecipe.picture} label="Picture URL - change to dropzone" variant="outlined" onChange={(event)=> setNewRecipe({...newRecipe, picture: event.target.value})}/>
                <TextareaAutosize required value={newRecipe.ingredients} aria-label="minimum height" minRows={8} placeholder="Ingredients" onChange={(event)=> setNewRecipe({...newRecipe, ingredients: event.target.value})} />
                <TextareaAutosize required value={newRecipe.procedure} aria-label="minimum height" minRows={15} placeholder="Procedure" onChange={(event)=> setNewRecipe({...newRecipe, procedure: event.target.value})} />
                <Button variant="contained" type="submit" >Confirm</Button>
            </form>
        </Box> 
        </>
        }
        <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
        
    </div>
    );
}

export default RecipeView;