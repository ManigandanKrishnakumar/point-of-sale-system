import React from 'react';
import './AppCheckBox.scss';

export default ({label, isSelected, onClick}) => {
  return (
    <div
      className={`payment-type-container ${isSelected ? 'selected' : ''}`}
      onClick={() => {
        onClick(label);
      }}>
      <h3>{label}</h3>
    </div>
  );
};
