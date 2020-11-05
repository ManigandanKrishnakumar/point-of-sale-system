import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavButton.scss';

export default ({icon, path}) => {
  return (
    <NavLink to={path} activeClassName="active">
      <div className="nav-button-container">{icon}</div>
    </NavLink>
  );
};
