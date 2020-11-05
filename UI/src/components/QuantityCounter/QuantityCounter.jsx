import React, {useContext} from 'react';
import './QuantityCounter.scss';

import {RiAddCircleLine} from 'react-icons/ri';
import {BiMinusCircle} from 'react-icons/bi';
import {BillContext} from '../../state/contexts/BillContext';
import {BILL_ACTIONS} from '../../state/constants/action-names';

export default ({qty, id}) => {
  const {dispatch} = useContext(BillContext);
  const updateQty = (add) => {
    dispatch({type: BILL_ACTIONS.INCR_OR_QTY, payload: {id, add: add}});
  };
  return (
    <div className="quantity-counter">
      <BiMinusCircle className="counter-icon" onClick={() => updateQty(-1)} />
      <p className="quantity">{qty}</p>
      <RiAddCircleLine className="counter-icon" onClick={() => updateQty(1)} />
    </div>
  );
};
