import { useSelector } from "react-redux"

function RecipeDetails() {
    const recipeIdDetails = useSelector(store => store.spoon.recipeIdDetails);
   
    return(
        <>
        <p>{recipeIdDetails.title}</p>
        <img src={recipeIdDetails.image} />
        <div dangerouslySetInnerHTML={{__html: recipeIdDetails.summary}}></div>
        <h4>Ingredients</h4>
        <ul>
        {recipeIdDetails && recipeIdDetails.extendedIngredients.map((ingredient, i) => {
            return(
                    <li key={i}>{ingredient.original}</li>
            )
        })}
        </ul>
        <h4>Instructions:</h4>
        <div dangerouslySetInnerHTML={{__html: recipeIdDetails.instructions}}></div>
        </>
    )
}

export default RecipeDetails