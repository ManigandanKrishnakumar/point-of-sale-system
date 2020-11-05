import React from 'react';
import './AppEndpointError.scss';

export default ({onTryAgain}) => {
  return (
    <div className="app-endpoint-error-container">
      <div className="text endpoint-error-content">
        <p className="text endpoint-error-message">
          Oops! something went wrong
        </p>
        <p className="try-again" onClick={onTryAgain}>
          Try Again
        </p>
      </div>
    </div>
  );
};
