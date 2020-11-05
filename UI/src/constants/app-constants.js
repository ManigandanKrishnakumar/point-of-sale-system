export const PAGE_CONSTANTS = {
  BILLING: {
    HEADING: 'Bloomerang Billing',
    VIEWS: [
      {
        id: '1',
        name: 'Create Bill',
      },
      {
        id: '2',
        name: 'Bill History',
      },
    ],
  },

  INVERNTORY: {
    HEADING: 'Inventory Dashboard',
    VIEWS: [
      {
        id: '1',
        name: 'Add Inventory',
      },
      {
        id: '2',
        name: 'View Inventory',
      },
    ],
  },
};

export const TAX = {
  SGST: 0.0,
  CGST: 0.0,
};

export const PAYMENT_METHODS = [
  {
    id: '1',
    name: 'Cash',
  },
  {
    id: '2',
    name: 'Credit / Debit Card',
  },
  {
    id: '3',
    name: 'UPI',
  },
];

export const ERROR_MSGS = {
  PHONE: 'Enter a valid phone number',
  NAME: 'Enter a valid name (only alphabets)',
  ER_DUP_ENTRY:
    'Seems like this Product ID already exists. Please enter a new one',
  DEFAULT_API_ERR:
    'Something went wrong. Please refresh the page and try again',
};
