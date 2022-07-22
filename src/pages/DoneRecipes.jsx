import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context';
import { changeLocalStorage } from '../assets/hooks';
import CardDoneRecipe from '../components/CardDoneRecipes';

const DoneRecipes = () => {
  const { setPageTitle } = useContext(AppContext);
  useEffect(() => {
    setPageTitle('Done Recipes');
  }, []);

  const [recipes, setRecipes] = useState();

  useEffect(() => {
    setRecipes(changeLocalStorage('doneRecipes'));
  }, []);

  const filtro = (filter) => {
    const arrayRecipes = changeLocalStorage('doneRecipes');
    if (!filter) return setRecipes(arrayRecipes);
    const newFilter = arrayRecipes.filter((recipe) => recipe.type === filter);
    setRecipes(newFilter);
  };

  return (
    <div>
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
      {recipes && recipes.map((recipe, index) => (
        <CardDoneRecipe key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </div>
  );
};

export default DoneRecipes;
