import React, {useContext, useState} from 'react';
import {BillToPrint} from '..';
import {submitBill} from '../../services/billService';
import {
  lengthValidation,
  nameValidation,
  phoneNumberValidation,
} from '../../services/formValidations';
import {BILL_ACTIONS} from '../../state/constants/action-names';
import {BillContext} from '../../state/contexts/BillContext';
import {AppLoader, Button} from '../shared';

import './BillingActions.scss';

const INITIAL_BILL = {
  BILL_ID: 31,
  CUSTOMER_ID: 28,
  ITEMS: '{"items": []}',
  CGST: 0,
  SGST: 0,
  ITEMS_COST: 100,
  TOTAL_COST: 100,
  payment_mode: 'Cash',
  USER_ID: 1,
  CREATION_DATE: '2020-10-25T09:18:55.000Z',
  PHONE_NUMBER: '1232131321',
  CUSTOMER_NAME: 'as',
  NO_OF_VISITS: 1,
};

export default ({setCustomerErrors, resetSearchInputs}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [bill, setBill] = useState(INITIAL_BILL);

  const {data, dispatch} = useContext(BillContext);

  const printBill = (data) => {
    setBill(data);
    window.print();
  };
  const onBillPress = () => {
    const customerInfo = data.customerInfo;
    const isNameValid = nameValidation(customerInfo.name);
    const isPhoneValid = phoneNumberValidation(customerInfo.phone);
    if (!isNameValid || !isPhoneValid) {
      if (!isNameValid) {
        setCustomerErrors((prevState) => ({...prevState, name: true}));
      }
      if (!isPhoneValid) {
        setCustomerErrors((prevState) => ({...prevState, phone: true}));
      }
      return;
    }

    submitBill(
      data,
      (data) => {
        dispatch({type: BILL_ACTIONS.BILL_RESET});
        setCustomerErrors({phone: false, name: false});
        printBill(data);
      },
      setLoading,
      setError,
    );
  };
  const onCancelPress = () => {
    resetSearchInputs();
    dispatch({type: BILL_ACTIONS.BILL_RESET});
  };

  if (loading) {
    return <AppLoader size="small" />;
  }

  return (
    <>
      <BillToPrint bill={bill} />
      <div className="billing-actions-container">
        <div className="action-buttons-wrappers">
          <Button title="Cancel" size="xlarge" onPress={onCancelPress} />
          <Button
            title="Bill"
            size="xlarge"
            disable={!lengthValidation(data.items)}
            onPress={onBillPress}
          />
        </div>
      </div>
      {error ? (
        <p className="error-message text-center">
          Something went wrong please try again
        </p>
      ) : null}
    </>
  );
};
