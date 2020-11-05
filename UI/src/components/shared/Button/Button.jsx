import React from 'react';
import './Button.scss';

export default ({size = 'large' || 'small', title, onPress, disable}) => {
  return (
    <button
      className={`button ${'button-' + size}`}
      onClick={onPress}
      disabled={disable}>
      <p className={`title ${'button-text-' + size}`}>{title}</p>
    </button>
  );
};
