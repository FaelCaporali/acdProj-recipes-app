/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useContext, useState } from 'react';
import useRecipeType from '../assets/hooks/useRecipeType';
import AppContext from '../context';

const SearchBar = () => {
  const [formData, setFormData] = useState({
    queryText: '',
    searchOption: '',
  });
  const { updateFilters, setSearchIsVisible } = useContext(AppContext);
  const recipeType = useRecipeType();

  const onFormChange = (e) => {
    const inputName = e.target.name;
    const inputVal = e.target.value;
    setFormData((oldState) => ({
      ...oldState,
      [inputName]: inputVal,
    }));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    if (formData.searchOption === 'byFirstLetter'
    && formData.queryText.length > 1
    ) {
      return alert('Your search must have only 1 (one) character');
    }

    updateFilters({ ...formData, recipeType });
    setSearchIsVisible(false);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <form
      onClick={ (e) => e.stopPropagation() }
      className="search-form"
      onSubmit={ onFormSubmit }
    >
      <input
        onChange={ onFormChange }
        type="text"
        name="queryText"
        value={ formData.queryText }
        data-testid="search-input"
        placeholder="Search term"
      />
      <div>
        <h6>Search by:</h6>
        <label htmlFor="ingredient">
          <input
            onChange={ onFormChange }
            type="radio"
            id="ingredient"
            name="searchOption"
            value="byIngredient"
            data-testid="ingredient-search-radio"
            checked={ formData.searchOption === 'byIngredient' }
          />
          Ingredient
        </label>
        <br />
        <label htmlFor="name">
          <input
            onChange={ onFormChange }
            type="radio"
            id="name"
            name="searchOption"
            value="byName"
            data-testid="name-search-radio"
            checked={ formData.searchOption === 'byName' }
          />
          Name
        </label>
        <br />
        <label htmlFor="firstLetter">
          <input
            onChange={ onFormChange }
            type="radio"
            id="firstLetter"
            name="searchOption"
            value="byFirstLetter"
            data-testid="first-letter-search-radio"
            checked={ formData.searchOption === 'byFirstLetter' }
          />
          First Letter
        </label>
      </div>
      <button type="submit" data-testid="exec-search-btn">Submit</button>
    </form>
  );
};

export default SearchBar;
