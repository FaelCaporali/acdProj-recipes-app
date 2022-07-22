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

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn" onClick={ null }>
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn" onClick={ null }>
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn" onClick={ null }>
        Drinks
      </button>
      {recipes && recipes.map((recipe, index) => (
        <CardDoneRecipe key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </div>
  );
};

export default DoneRecipes;
