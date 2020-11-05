import React from 'react';
import './SuggestionItem.scss';

export default ({id, name, quantity, price, selectedId}) => {
  return (
    <div
      className={`suggestion-item-container ${
        selectedId === id ? 'selected' : ''
      }`}>
      <p className="text id">{id}</p>
      <p className="text name">{name}</p>
      <p className="text quantity">{quantity}</p>
      <p className="text price">{price + ' Rs.'}</p>
    </div>
  );
};
