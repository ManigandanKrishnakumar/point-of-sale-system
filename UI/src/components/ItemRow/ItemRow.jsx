import React, {useContext} from 'react';
import './ItemRow.scss';

import {QuantityCounter} from '..';
import {FaMinus} from 'react-icons/fa';
import {BillContext} from '../../state/contexts/BillContext';
import {BILL_ACTIONS} from '../../state/constants/action-names';
import ToggleInput from '../shared/ToggleInput/ToggleInput';

export default ({item, showActualUnitPrice, readMode}) => {
  const {dispatch} = useContext(BillContext);
  return (
    <div className="item-row-container">
      <p className="item-list-value">{item.id}</p>
      <p className="item-list-value">{item.name}</p>

      {readMode ? (
        <p className="item-list-value">{item.qty}</p>
      ) : (
        <QuantityCounter qty={item.qty} id={item.id} />
      )}

      {showActualUnitPrice ? (
        <p className="item-list-value">{item.unitPrice}</p>
      ) : null}

      {readMode ? (
        <p className="item-list-value">{item.billUnitPrice}</p>
      ) : (
        <div className="item-list-value unit-price-container">
          <ToggleInput
            type="number"
            value={item.billUnitPrice}
            action={BILL_ACTIONS.SET_UNIT_PRICE}
            payloadId={item.id}
          />
        </div>
      )}

      <p className="item-list-value">
        {(item.qty * item.billUnitPrice).toFixed(2)}
      </p>

      {!readMode ? (
        <div
          className="delete-icon-container"
          onClick={() =>
            dispatch({
              type: BILL_ACTIONS.REMOVE_ITEM,
              payload: item.id,
            })
          }>
          <FaMinus className="delete-icon" />
        </div>
      ) : null}
    </div>
  );
};
