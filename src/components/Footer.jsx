import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  const { setSearchIsVisible } = useContext(AppContext);

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => {
          history.push('/drinks');
          setSearchIsVisible(false);
        } }
      >
        <img data-testid="drinks-bottom-btn" src={ drinkIcon } alt="drink" />
        <span className="drink-btn-adjust">Drinks</span>
      </button>
      <button
        type="button"
        onClick={ () => {
          history.push('/foods');
          setSearchIsVisible(false);
        } }
      >
        <img data-testid="food-bottom-btn" src={ mealIcon } alt="food" />
        Foods
      </button>
    </footer>
  );
}

export default Footer;
