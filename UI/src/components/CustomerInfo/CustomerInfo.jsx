import React from 'react';
import {ERROR_MSGS} from '../../constants/app-constants';
import {BILL_ACTIONS} from '../../state/constants/action-names';
import {Input} from '../shared';
import './CustomerInfo.scss';

export default ({customerInfo, dispatch, errors}) => {
  const phoneOnChange = (value) => {
    dispatch({
      type: BILL_ACTIONS.SET_CUSTOMER_PHONE,
      payload: value,
    });
  };

  const nameOnChange = (value) => {
    dispatch({
      type: BILL_ACTIONS.SET_CUSTOMER_NAME,
      payload: value,
    });
  };

  return (
    <div className="customer-info-form-container">
      <h2>Customer Information</h2>
      <div className="form-container">
        <Input
          label="Name"
          type="text"
          placeholder="Enter name"
          value={customerInfo.name}
          onChange={nameOnChange}
          errorMsg={ERROR_MSGS.NAME}
          isError={errors.name}
        />
        <Input
          label="Phone"
          type="number"
          className="margin-top-1em"
          placeholder="Enter phone number"
          value={customerInfo.phone}
          onChange={phoneOnChange}
          errorMsg={ERROR_MSGS.PHONE}
          isError={errors.phone}
        />
      </div>
    </div>
  );
};
