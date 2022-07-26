import React, { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import AppContext from '../context';

const Header = () => {
  const { location: { pathname } } = useHistory();
  const { pageTitle, setSearchIsVisible, searchIsVisible } = useContext(AppContext);

  return (
    <>
      <header>
        <Link to="/profile">
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </Link>

        <h1 data-testid="page-title">{pageTitle}</h1>

        {
          (pathname === '/foods' || pathname === '/drinks') && (
            <button onClick={ () => setSearchIsVisible(!searchIsVisible) } type="button">
              <img
                src={ searchIcon }
                alt="search icon"
                data-testid="search-top-btn"
              />
            </button>
          )
        }
      </header>
      {searchIsVisible && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
          className="search-modal"
          onClick={ () => setSearchIsVisible(false) }
        >
          <SearchBar setSearchIsVisible={ setSearchIsVisible } />
        </div>
      )}
    </>
  );
};

export default Header;
