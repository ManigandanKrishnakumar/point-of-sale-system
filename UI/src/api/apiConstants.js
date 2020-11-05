export const BASE_URL = {
  LOCAL: 'http://localhost:80/',
  MOCK: 'https://run.mocky.io/v3/',
};

export const END_POINTS = {
  BILLING: {
    SEARCH: '/inventory/get-items',
    ADD_BILL: '/billing/add-bill',
    GET_BILL: '/billing/get-bills',
  },
  INVENTORY: {
    GET_INVENTORY_LIST: '/inventory/get-items',
    UPDATE_INVENTORY_ITEM: '/inventory/update-item',
    ADD_INVENTORY: '/inventory/add-items',
  },
};

export const MOCK_END_POINTS = {
  GET_BILL: '/650e022d-dbd7-492f-a169-bbaaa41dd66e',
};
