import React from 'react';
import './Input.scss';

export default ({
  label,
  onChange,
  type,
  placeholder,
  value,
  className,
  errorMsg,
  isError,
}) => {
  return (
    <>
      <div
        className={`app-input-container ${className ? className : ''} ${
          isError ? 'error' : ''
        }`}>
        <div className="app-input-label-container">
          <p className="app-input-label">{label}</p>
        </div>

        <input
          type={type}
          placeholder={placeholder}
          className="app-input"
          value={value}
          onChange={(change) => {
            const value = change.target.value.toString();
            onChange(value);
          }}
        />
      </div>
      <p className="error-message">{isError ? errorMsg : ''}</p>
    </>
  );
};
