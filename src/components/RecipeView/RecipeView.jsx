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
import '../App/App.css';
import './RecipeView.css';
import { Grid, Dialog, DialogContent } from '@material-ui/core';


function RecipeView() {

    const dispatch = useDispatch();
    const history = useHistory();
    const {recipeId} = useParams();

    useEffect(() => {
        getRecipeDetails();
    }, [])

    const recipe = useSelector(store => store.recipe);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [newRecipe, setNewRecipe] = useState({id: recipe.id, name: recipe.name, ingredients: recipe.ingredients, procedure: recipe.procedure, picture: recipe.picture});
    
    const handleCloseEdit = () => {
        setEditOpen(false);
    };
    const handleOpenEdit = () => {
        setEditOpen(true);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleConfirmEdit = (event) => {
        event.preventDefault();
        console.log('newRecipe', newRecipe);
        dispatch({type: 'EDIT_RECIPE', payload: newRecipe})
        setEditView(!editView)
    }

    const handleDelete = () => {
        dispatch({type: 'DELETE_RECIPE', payload: recipe.id})
        history.push('/favorites');
    }


    const getRecipeDetails = () => {
        console.log('recipeId', recipeId);
        dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: recipeId,
            push: history.push,
            isFavorites: false,
        });
    }

    ///////////////CHECK THIS OUT ///////////////////////
    const handlePlanIt = (event, id) => {
        event.stopPropagation();
        handleClickOpen();
    }
    return (
    <div className='standardBackground'>
    {/* Can access recipe view from multiple pages, a back button returns to previous view */}
        <Button variant="outlined" color="secondary" onClick={() => history.goBack()}>Back</Button>
        
            <Box className="form">
                <Grid direction="column" container spacing={2} justifyContent="center">
                <Grid item xs={12} container justifyContent="center">
                <Typography variant="h4">{recipe.name}</Typography>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                <img border="2px" src={recipe.picture} width="400px"/>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                <Grid item xs={12}>
                <Typography variant="h5">Ingredients</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography>{recipe.ingredients}</Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                <Grid item xs={12}>
                <Typography variant="h5">Directions</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography>{recipe.procedure}</Typography>
                </Grid>
                </Grid>
                <Grid item xs={12} container justifyContent="center">
                <Button variant="contained"
                    onClick={(event) => handlePlanIt(event, recipe.id)}
                >Plan It</Button>
                </Grid>
                <Grid item item xs={12} container justifyContent="center">
                <Button variant="contained" onClick={() => handleOpenEdit()}>Edit Recipe</Button>
                </Grid>
                </Grid>
            </Box>

        <Dialog onClose={handleCloseEdit} open={editOpen}>
        {/* <Button variant="contained" onClick={() => handleCloseEdit()}>Cancel</Button> */}
        <DialogContent>
            <Grid container direction="column">
            <form autoComplete="off" onSubmit={(event)=> handleConfirmEdit(event)}>
            <Grid item>
                <TextField required value={newRecipe.name || recipe.name} label="Recipe Name" variant="filled" onChange={(event)=> setNewRecipe({...newRecipe, name: event.target.value})}/>
            </Grid>
            <Grid item>
                <TextField value={newRecipe.picture || recipe.picture} label="Picture URL" variant="filled" onChange={(event)=> setNewRecipe({...newRecipe, picture: event.target.value})}/>
            </Grid>
            <Grid item>
                <TextField value={newRecipe.ingredients || recipe.ingredients} label="Ingredients" variant="filled" onChange={(event)=> setNewRecipe({...newRecipe, ingredients: event.target.value})} />
            </Grid>
            <Grid item>
                <TextField value={newRecipe.procedure || recipe.procedure} label="Procedure" variant="filled" onChange={(event)=> setNewRecipe({...newRecipe, procedure: event.target.value})} />
            </Grid>
            <Grid item container justifyContent="center">
                <Button variant="contained" color="secondary" type="submit" >Confirm</Button>
            </Grid>
            <Grid item container justifyContent="center">             
                <Button variant="contained" color="secondary" onClick={()=>handleDelete()}>Delete Recipe</Button>
            </Grid>
            </form>
            </Grid>
        </DialogContent>
        
        </Dialog>

        <DatePicker open={open} setOpen={setOpen} recipeId={recipeId}/>
        
    </div>
    );
}

export default RecipeView;