import React from 'react';
import {BillingView, BillHistoryView} from './billing';
import {AddInventoryView, ListInventoryView} from './inventory';
export const VIEWS = {
  BILLING: {
    1: <BillingView />,
    2: <BillHistoryView />,
  },
  INVENTORY: {
    1: <AddInventoryView />,
    2: <ListInventoryView />,
  },
};
