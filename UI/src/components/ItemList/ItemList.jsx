import React, {useEffect, useState} from 'react';
import {ItemRow} from '..';
import './ItemList.scss';

export default ({
  items,
  totalPrice,
  showActualUnitPrice,
  readMode,
  itemsId,
}) => {
  const bottomRef = React.createRef();
  const listContainer = React.createRef();
  const [listHeight, setListHeight] = useState();
  useEffect(() => {
    setListHeight(listContainer.current.clientHeight + 'px');
    bottomRef.current.scrollIntoView({behavior: 'smooth'});
  }, [listContainer, bottomRef]);
  return (
    <>
      {/* <iframe
        id="ifmcontentstoprint"
        style="height: 0px; width: 0px; position: absolute"></iframe> */}
      <div className="item-list-container" id={itemsId}>
        <div className="item-list-header">
          <p className="item-list-heading">Product Id</p>
          <p className="item-list-heading">Product Name</p>
          <p className="item-list-heading">Qty</p>
          {showActualUnitPrice ? (
            <p className="item-list-heading">Actual Unit Price</p>
          ) : null}

          <p className="item-list-heading">Bill Unit Price</p>
          <p className="item-list-heading">Price</p>
        </div>

        <div ref={listContainer} className="items-container">
          <div style={{height: listHeight}} className="items-wrapper">
            {items.map((item, i) => {
              return (
                <ItemRow
                  item={item}
                  key={item.id}
                  showActualUnitPrice={showActualUnitPrice}
                  readMode={readMode}
                />
              );
            })}
            <div ref={bottomRef}></div>
          </div>
        </div>

        <div className="item-list-footer">
          <div className="total-items-container">
            <p className="label">Total Items: </p>
            <p className="count">{items.length}</p>
          </div>

          <div className="total-items-container">
            <p className="label">Total Price: </p>
            <p className="total-bill-price">{totalPrice + ' Rs.'}</p>
          </div>
        </div>
      </div>
    </>
  );
};
