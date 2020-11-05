import {PAYMENT_METHODS, TAX} from '../../constants/app-constants';

export const INITIAL_BILL_STATE = {
  tax: {
    sgst: TAX.SGST,
    cgst: TAX.CGST,
  },

  items: [],
  total: 0,
  paymentMethod: PAYMENT_METHODS[0].name,
  customerInfo: {
    name: '',
    phone: '',
  },
  view: '1',
};

export const INITIAL_INVENTORY_STATE = {
  view: '1',
  isUpdateLoading: false,
  isUpdateError: {error: false, errorCode: ''},
};
