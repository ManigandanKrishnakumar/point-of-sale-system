import React, {useContext, useState} from 'react';
import './BillingView.scss';

import {
  BillingActions,
  CustomerInfo,
  ItemsList,
  MethodOfPayment,
  QuantityInput,
  ProductsSearchBar,
} from '../../../components';
import {Button} from '../../../components/shared';
import {BillContext} from '../../../state/contexts/BillContext';
import {BILL_ACTIONS} from '../../../state/constants/action-names';

const INITIAL_STATE = {
  id: '',
  name: '',
  qty: 0,
  remaningQty: 0,
  billUnitPrice: 0,
  unitPrice: 0,
};

const INITIAL_CUSTOMER_INFO_ERRORS = {
  name: false,
  phone: false,
};

export default () => {
  const [item, setItem] = useState(INITIAL_STATE);
  const {data, dispatch} = useContext(BillContext);
  const [customerInfoErrors, setCustomerInfoErrors] = useState(
    INITIAL_CUSTOMER_INFO_ERRORS,
  );

  return (
    <div className="bill-container fade-in">
      <section className="billing-section">
        <div className="billing-info-container">
          <div className="inputs-container">
            <div className="search-bar-wrapper">
              <ProductsSearchBar
                onSelect={setItem}
                itemName={item.name}
                itemId={item.id}
              />
            </div>

            <QuantityInput value={item.qty} onChange={setItem} />
            <Button
              title="Add"
              size="large"
              disable={
                !item.id.length ||
                !item.name.length ||
                !item.qty ||
                item.remaningQty - item.qty < 0
              }
              onPress={() => {
                dispatch({type: BILL_ACTIONS.ADD_ITEM, payload: item});
                setItem(INITIAL_STATE);
              }}
            />
          </div>
          <ItemsList
            items={data.items}
            totalPrice={data.total}
            showActualUnitPrice={false}
            itemsId="invoice"
          />
          <BillingActions
            setCustomerErrors={setCustomerInfoErrors}
            resetSearchInputs={() => {
              setItem({...INITIAL_STATE});
            }}
          />
        </div>

        <div className="customer-info-container">
          <MethodOfPayment
            paymentMethod={data.paymentMethod}
            dispatch={dispatch}
          />

          <CustomerInfo
            customerInfo={data.customerInfo}
            dispatch={dispatch}
            errors={customerInfoErrors}
          />
        </div>
      </section>
    </div>
  );
};
