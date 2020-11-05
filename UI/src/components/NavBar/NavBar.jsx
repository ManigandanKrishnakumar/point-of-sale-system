import React from 'react';
import NavButton from '../NavButton/NavButton';
import './NavBar.scss';
import {RiBillFill} from 'react-icons/ri';
import {RiDashboardLine} from 'react-icons/ri';
import {GiCottonFlower} from 'react-icons/gi';

export default () => {
  return (
    <div className="nav-bar-container">
      <div className="logo-container">
        <GiCottonFlower className="logo" />
      </div>
      <div className="nav-buttons-container">
        <NavButton icon={<RiBillFill className="icon" />} path="billing" />

        <NavButton
          icon={<RiDashboardLine className="icon" />}
          path="inventory"
        />
      </div>
    </div>
  );
};
