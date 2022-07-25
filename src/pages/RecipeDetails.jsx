import React, { useState } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { fetchData } from '../assets/api';
import { useAsyncEffect, changeLocalStorage } from '../assets/hooks';
import useRecipeType from '../assets/hooks/useRecipeType';
import { getYoutubeEmbedURL, mapIngredients } from '../assets/functions/index';
import { parseToCarousel } from '../assets/functions/parseToCarousel';
import SugestionsCarousel from '../components/SugestionsCarousel';
import ShareAndLike from '../components/ShareAndLike';

const RecipeDetails = () => {
  const {
    params: { id },
  } = useRouteMatch();
  const { push } = useHistory();

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [sugestions, setSugestions] = useState([]);

  const recipeType = useRecipeType();
  const sugestionsType = recipeType === 'Meal' ? 'Drink' : 'Meal';
  const storageRecipeTypes = recipeType === 'Meal' ? 'meals' : 'cocktails';
  const pathTypes = recipeType === 'Meal' ? 'foods' : 'drinks';

  const youtubeSrc = recipe.strMeal
    ? getYoutubeEmbedURL(recipe.strYoutube)
    : undefined;

  const donesKey = changeLocalStorage('doneRecipes');
  const progKey = changeLocalStorage('inProgressRecipes');
  const checkDone = donesKey && donesKey.some((done) => done.id === id);
  const checkProgress = progKey
    && progKey[storageRecipeTypes]
    && Object.keys(progKey[storageRecipeTypes]).some((key) => key === id);

  useAsyncEffect(async () => {
    await fetchData.detail({ recipeType, id }).then((info) => {
      setRecipe(info[0]);
      setIngredients(mapIngredients(info[0]).filter((ing) => ing.name !== ''));
    });

    await fetchData
      .get({
        searchOption: 'byName',
        recipeType: sugestionsType,
        queryText: '',
      })
      .then((info) => setSugestions(
        info.map((item, i) => parseToCarousel(item, sugestionsType, i)),
      ));
  }, []);

  return (
    <div className="recipe-wrapper" data-testid="recipe-wrapper">
      <ShareAndLike recipe={ recipe } />
      <section>
        <img
          src={ recipe[`str${recipeType}Thumb`] }
          alt={ recipe[`str${recipeType}`] }
          data-testid="recipe-photo"
        />
        <h2 data-testid="recipe-title">{recipe[`str${recipeType}`]}</h2>
        <p data-testid="recipe-category">
          {recipeType === 'Meal' ? recipe.strCategory : recipe.strAlcoholic}
        </p>
        <ol>
          {ingredients.length
            && ingredients.map((ingredient, index) => (
              <li
                key={ `${ingredient.name} mesure inList` }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${ingredient.name} - ${ingredient.amount} `}
              </li>
            ))}
        </ol>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </section>
      <aside>
        {recipe.strYoutube && (
          <iframe
            title="Recipe on Youtube"
            width="100%"
            src={ youtubeSrc }
            frameBorder="0"
            allowFullScreen
            data-testid="video"
          />
        )}
        {sugestions.length && <SugestionsCarousel sugestions={ sugestions } />}
      </aside>
      {!checkDone && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => push(`/${pathTypes}/${id}/in-progress`) }
          className="final-button"
        >
          {checkProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
};

export default RecipeDetails;
