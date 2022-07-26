import React, { useContext, useEffect, useState } from 'react';
import { changeLocalStorage } from '../assets/hooks';
import CardDoneRecipe from '../components/CardDoneRecipes';
import AppContext from '../context';
import favIco from '../images/blackHeartIcon.svg';

const FavoriteRecipes = () => {
  const { setPageTitle } = useContext(AppContext);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setPageTitle('Favorite Recipes');
    setFavorites(changeLocalStorage('favoriteRecipes'));
  }, []);

  const filtro = (filter) => {
    const arrayRecipes = changeLocalStorage('favoriteRecipes');
    if (!filter) return setFavorites(arrayRecipes);
    const newFilter = arrayRecipes.filter((recipe) => recipe.type === filter);
    setFavorites(newFilter);
  };

  const disLikeRecipe = (id) => {
    changeLocalStorage('favoriteRecipes', id, 'arrayRemove');
    setFavorites(changeLocalStorage('favoriteRecipes'));
  };

  return (
    <div>
      <div className="saved-filters-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filtro() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => filtro('food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filtro('drink') }
        >
          Drinks
        </button>
      </div>
      {favorites && favorites.map((recipe, index) => (
        <div key={ recipe.id }>
          <CardDoneRecipe recipe={ recipe } index={ index } />
          <button
            id="favorite-btn"
            src={ favIco }
            type="button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => disLikeRecipe(recipe.id) }
          >
            <img src={ favIco } alt="like or dislike this recipe" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FavoriteRecipes;
