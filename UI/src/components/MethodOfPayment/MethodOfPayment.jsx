import React from 'react';
import {PAYMENT_METHODS} from '../../constants/app-constants';
import {BILL_ACTIONS} from '../../state/constants/action-names';
import {CheckBox} from '../shared';
import './MethodOfPayment.scss';

export default ({paymentMethod, dispatch}) => {
  return (
    <div className="mod-container">
      <h2 className="title">Payment method</h2>
      <div className="list-container">
        {PAYMENT_METHODS.map((method) => {
          return (
            <CheckBox
              key={method.id}
              label={method.name}
              isSelected={paymentMethod === method.name}
              onClick={(mod) => {
                dispatch({type: BILL_ACTIONS.SET_PAYMENT_METHOD, payload: mod});
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
