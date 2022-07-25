import React, { useState } from 'react';
import propTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

const SugestionCarousel = ({ sugestions = [] }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      nextIcon={ <span className="material-symbols-outlined">arrow_forward_ios</span> }
      nextLabel={ null }
      prevIcon={ <span className="material-symbols-outlined">arrow_back_ios</span> }
      prevLabel={ null }
      activeIndex={ index }
      onSelect={ handleSelect }
    >
      {sugestions.map((item) => {
        const { testid, thumb, name, id, recipeType } = item;
        const routeType = recipeType === 'Meal' ? 'foods' : 'drinks';
        return (
          <Carousel.Item key={ `CarouselItem${id}` }>
            <Link data-testid={ testid } to={ `/${routeType}/${id}` }>
              <img src={ thumb } alt={ name } />
              <Carousel.Caption>
                <h4>{name}</h4>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

SugestionCarousel.propTypes = {
  sugestions: propTypes.arrayOf(
    propTypes.shape({
      strTags: propTypes.string,
    }),
  ).isRequired,
};

export default SugestionCarousel;
