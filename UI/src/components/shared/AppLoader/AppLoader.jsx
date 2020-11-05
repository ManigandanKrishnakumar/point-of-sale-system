import React from 'react';
import './AppLoader.scss';

export default ({size}) => {
  return (
    <div className="loader-container">
      <div className={`container `}>
        <div className={`loader ${size}`}>
          <span></span>
        </div>
      </div>
    </div>
  );
};
