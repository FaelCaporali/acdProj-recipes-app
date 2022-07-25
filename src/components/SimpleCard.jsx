import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NOT_REQUIRED = 'not-required';

const SimpleCard = ({ index, id, recipeType, thumb, name, testid, className }) => {
  const typeUrl = useMemo(
    () => (recipeType === 'Meal' ? 'foods' : 'drinks'),
    [recipeType],
  );

  return (
    <Link to={ `/${typeUrl}/${id}` } data-testid={ testid } className={ className }>
      <img src={ thumb } alt={ name } data-testid={ `${index}-card-img` } />
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
    </Link>
  );
};

SimpleCard.defaultProps = {
  testid: NOT_REQUIRED,
  index: NOT_REQUIRED,
  className: NOT_REQUIRED,
};

SimpleCard.propTypes = {
  index: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  id: PropTypes.string.isRequired,
  recipeType: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  testid: PropTypes.string,
  className: PropTypes.string,
};

export default SimpleCard;
