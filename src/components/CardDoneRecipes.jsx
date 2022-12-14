import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIco from '../images/shareIcon.svg';

const CardDoneRecipe = ({ recipe, index }) => {
  const {
    image,
    name,
    category,
    doneDate,
    tags,
    nationality,
    type,
    alcoholicOrNot,
    id } = recipe;
  const routeType = type === 'food' ? 'foods' : 'drinks';
  const {
    location: { origin },
  } = window;

  const [copiedAlert, fireAlert] = useState(false);

  const shareRecipe = () => {
    const textToClip = `${origin}/${routeType}/${id}`;
    const timeAlertIsVisible = 3000;
    navigator.clipboard.writeText(textToClip);
    fireAlert(true);
    setTimeout(() => fireAlert(false), timeAlertIsVisible);
  };

  return (
    <div>
      <Link to={ `/${routeType}/${id}` }>
        <img
          src={ image }
          alt={ name }
          width="100px"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <span data-testid={ `${index}-horizontal-name` }>{name}</span>
      <span
        data-testid={ `${index}-horizontal-top-text` }
      >
        {type === 'food' ? `${nationality} - ${category}` : alcoholicOrNot }
      </span>
      <div>
        {copiedAlert && (
          <div className="alert alert-success position-absolute" role="alert">
            Link copied!
          </div>
        )}
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
          onClick={ shareRecipe }
          src={ shareIco }
        >
          <img src={ shareIco } alt="share this recipe" />
        </button>
        <span data-testid={ `${index}-horizontal-done-date` }>{doneDate}</span>
      </div>
      {tags && type === 'food'
        && tags.map((item) => (
          <span key={ item } data-testid={ `${index}-${item}-horizontal-tag` }>
            {item}
          </span>
        ))}
    </div>
  );
};

CardDoneRecipe.defaultProps = {
  index: 'not-required',
};

CardDoneRecipe.propTypes = {
  index: PropTypes.number,
  recipe: PropTypes.shape({
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    name: PropTypes.string.isRequired,
    doneDate: PropTypes.string,
    image: PropTypes.string,
    nationality: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default CardDoneRecipe;
