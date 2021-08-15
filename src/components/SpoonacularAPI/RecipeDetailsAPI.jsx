import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DatePicker from "../DatePicker/DatePicker";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import "../App/App.css";
import { Grid, Dialog, DialogContent, makeStyles } from "@material-ui/core";

const useStyles = makeStyles ({
    gridBackground: {        
        backgroundColor: "#b6bdb6",
        width: "90%",
        justifyContent: "center",
        borderRadius: "5px",
        boxShadow: "0 3px 5px 4px rgba(0, 0, 0, 0.3)",
    },
})

function RecipeDetailsAPI() {
    const dispatch = useDispatch();
    const classes = useStyles();
    const history = useHistory();
    const { recipeId } = useParams();
    const recipeIdDetails = useSelector(store => store.spoon.recipeIdDetails);
   
    return(
        <div className='standardBackground'>
        <Grid container justifyContent='center'>
        <Grid container className={classes.gridBackground}>
        <Grid item xs={2}>
        <Button
            variant='text'
            color='secondary'
            onClick={() => history.goBack()}
        >
        Back
        </Button>
        </Grid>
        <Grid item xs={8} container justifyContent="center" style={{marginTop: '20px'}}>
        <Typography variant="h6">{recipeIdDetails.title}</Typography>
        </Grid>
        <Grid item xs={2}>
        <Button
            variant='text'
            color='secondary'
            onClick={() => history.goBack()}
        >
        Plan
        </Button>
        </Grid>
        <Grid item xs={10} style={{marginTop: '15px'}}>
        <img src={recipeIdDetails.image} border="1px" />
        </Grid>
        {/* <Grid item xs={10}>
        <div dangerouslySetInnerHTML={{__html: recipeIdDetails.summary}}></div>
        </Grid> */}
        <Grid item container xs={10}>
        <Typography style={{fontWeight: '600', marginTop: '20px', marginBottom: '-10px'}}>Ingredients</Typography>
        </Grid>
        <Grid item container xs={10}>
        <ul>
        {recipeIdDetails.extendedIngredients && recipeIdDetails.extendedIngredients.map((ingredient, i) => {
            return(
                    <li key={i}>{ingredient.original}</li>
            )
        })}
        </ul>
        </Grid>
        <Grid item container xs={10} alignContent="flex-start" style={{marginTop: '15px', marginBottom: '-10px'}}>
        <Typography style={{fontWeight: '600'}}>Directions:</Typography>
        <Grid item xs={1}></Grid>
        </Grid>
        <Grid item xs={10} container style={{marginBottom: '40px'}}>
        <div dangerouslySetInnerHTML={{__html: recipeIdDetails.instructions}}></div>
        </Grid>
        <Grid item xs={1}></Grid>
        </Grid>
        </Grid>
        </div>
    )
}

export default RecipeDetailsAPI