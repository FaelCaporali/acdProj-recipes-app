import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import shareIco from '../images/shareIcon.svg';
import toFavIco from '../images/whiteHeartIcon.svg';
import favIco from '../images/blackHeartIcon.svg';
import parseToFav from '../assets/functions/parseToFav';
import { changeLocalStorage } from '../assets/hooks';
import useRecipeType from '../assets/hooks/useRecipeType';

export default function ShareAndLike({ recipe }) {
  const [copiedAlert, fireAlert] = useState(false);
  const [, forceReload] = useState(true);
  const recipeType = useRecipeType();
  const {
    location: { pathname },
  } = useHistory();
  const {
    location: { origin },
  } = window;

  const parsedToFavorites = parseToFav(recipe, recipeType);
  const { id } = parsedToFavorites;

  const favsKey = changeLocalStorage('favoriteRecipes');
  const checkFavs = () => favsKey !== null && favsKey.some((favRec) => favRec.id === id);

  const heartIco = checkFavs() ? favIco : toFavIco;

  useEffect(() => () => clearTimeout(), []);

  const shareRecipe = () => {
    const timeAlertIsVisible = 3000;
    const inProgressPath = '/in-progress';
    const textToClip = pathname.includes(inProgressPath)
      ? `${origin}${pathname.substring(
        0,
        pathname.length - inProgressPath.length,
      )}`
      : `${origin}${pathname}`;
    navigator.clipboard.writeText(textToClip);
    fireAlert(true);
    setTimeout(() => fireAlert(false), timeAlertIsVisible);
  };

  const likeRecipe = () => {
    if (favsKey === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    forceReload((old) => !old);
    return checkFavs()
      ? changeLocalStorage('favoriteRecipes', id, 'arrayRemove')
      : changeLocalStorage('favoriteRecipes', parsedToFavorites, 'arrayPush');
  };

  return (
    <div className="share-and-like">
      {copiedAlert && (
        <div className="alert alert-success position-absolute" role="alert">
          Link copied!
        </div>
      )}
      <button type="button" data-testid="share-btn" onClick={ shareRecipe }>
        <img src={ shareIco } alt="share this recipe" />
      </button>
      <button
        id="favorite-btn"
        src={ heartIco }
        type="button"
        data-testid="favorite-btn"
        onClick={ likeRecipe }
      >
        <img src={ heartIco } alt="like or dislike this recipe" />
      </button>
    </div>
  );
}

ShareAndLike.propTypes = {
  recipe: propTypes.shape({
    strCategory: propTypes.string,
  }).isRequired,
};
