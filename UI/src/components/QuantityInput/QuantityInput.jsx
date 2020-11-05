import React from 'react';
import './QuantityInput.scss';

import {BiChevronDown, BiChevronUp} from 'react-icons/bi';

export default ({value, onChange}) => {
  return (
    <div className="quantity-input-container">
      <h2 className="quantity-label">Quantity</h2>
      <input
        type="number"
        className="qty-input"
        placeholder="qty"
        value={value}
        onChange={(change) => {
          const changeValue = parseInt(change.target.value);
          onChange((prevState) => {
            return {
              ...prevState,
              qty: changeValue,
            };
          });
        }}
      />
      <div className="spinner-buttons-container">
        <div
          className="spinner-icon-container"
          onClick={() => {
            onChange((prevState) => ({...prevState, qty: prevState.qty + 1}));
          }}>
          <BiChevronUp className="spinner-icon" />
        </div>
        <div
          className="spinner-icon-container"
          onClick={() => {
            onChange((prevState) => ({...prevState, qty: prevState.qty + -1}));
          }}>
          <BiChevronDown className="spinner-icon" />
        </div>
      </div>
    </div>
  );
};
