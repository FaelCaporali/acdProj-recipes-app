import React from 'react';
import { useHistory } from 'react-router-dom';
import { useLocalStorage } from '../assets/hooks';

function Profile() {
  const history = useHistory();

  const { email } = useLocalStorage('user');

  const handleClickLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <h3 data-testid="profile-email">{email}</h3>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes

      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleClickLogout }
      >
        Logout

      </button>
    </div>
  );
}

export default Profile;
