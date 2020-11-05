import React from 'react';
import './PageHeader.scss';

export default ({heading, endSlot, midSlot}) => {
  return (
    <div className="page-header-container">
      <h1 className="heading">{heading}</h1>
      <div className="slots-container">
        {midSlot ? <div className="slot middle">{midSlot}</div> : null}
        {endSlot ? <div className="slot end">{endSlot}</div> : null}
      </div>
    </div>
  );
};
