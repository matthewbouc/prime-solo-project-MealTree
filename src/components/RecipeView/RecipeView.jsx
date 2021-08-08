import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from "react-router-dom";


function RecipeView() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {recipeId} = useParams();

    const store = useSelector((store) => store);
    const [heading, setHeading] = useState('Functional Component');

    const getRecipeDetails = () => {
        dispatch({
            type: 'GET_RECIPE_DETAILS',
            payload: recipeId
        });
    }

    return (
    <div>
        <h2>{heading}</h2>
    </div>
    );
}

export default RecipeView;