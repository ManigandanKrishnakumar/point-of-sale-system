import {dateComparator} from '../services/dataTableService';

export const TABLES = {
  BILL_HISTORY: 'bill_history',
  INVENTORY_LIST: 'inventory_list',
};

export const TABLE_COLUMNS = {
  INVENTORY_LIST: {
    itemId: 'ITEM_ID',
    itemName: 'ITEM_NAME',
    remainingQty: 'QUANTITY',
    price: 'PRICE',
  },
};

export const DATA_TABLE_CONFIG = {
  [TABLES.BILL_HISTORY]: {
    GRID_OPTIONS: {
      columnDefs: [
        {
          headerName: 'Bill ID',
          valueGetter: (params) => {
            return params.data.BILL_ID;
          },
        },
        {
          headerName: 'Bill Date',
          valueGetter: (params) => {
            const date = new Date(params.data.CREATION_DATE);
            return date.toLocaleDateString();
          },
          type: ['dateColumn', 'nonEditableColumn'],
          sortable: true,
        },
        {
          headerName: 'Total',
          valueGetter: (params) => {
            return params.data.TOTAL_COST;
          },
          type: 'numberColumn',
          sortable: true,
        },
        {
          headerName: 'Payment Mode',
          valueGetter: (params) => {
            return params.data.PAYMENT_MODE;
          },
        },
        {
          headerName: 'Customer Name',
          valueGetter: (params) => {
            return params.data.CUSTOMER_NAME;
          },
          sortable: true,
        },
        {
          headerName: 'Customer Phone',
          valueGetter: (params) => {
            return params.data.PHONE_NUMBER;
          },
        },
      ],
      defaultColDef: {
        width: 150,
        editable: false,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
      },
      defaultColGroupDef: {marryChildren: true},
      columnTypes: {
        numberColumn: {
          width: 130,
          filter: 'agNumberColumnFilter',
        },
        medalColumn: {
          width: 100,
          columnGroupShow: 'open',
          filter: false,
        },
        nonEditableColumn: {editable: false},
        dateColumn: {
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: dateComparator,
          },
        },
      },
      isFullWidthCell: true,
    },
  },
  [TABLES.INVENTORY_LIST]: {
    GRID_OPTIONS: {
      columnDefs: [
        {
          headerName: 'Product ID',
          field: TABLE_COLUMNS.INVENTORY_LIST.itemId,
          valueGetter: (params) => {
            return params.data[TABLE_COLUMNS.INVENTORY_LIST.itemId];
          },
        },
        {
          headerName: 'Product name',
          field: TABLE_COLUMNS.INVENTORY_LIST.itemName,
          valueGetter: (params) => {
            return params.data[TABLE_COLUMNS.INVENTORY_LIST.itemName];
          },
          sortable: true,
        },
        {
          headerName: 'Remaining Qty',
          field: TABLE_COLUMNS.INVENTORY_LIST.remainingQty,
          valueGetter: (params) => {
            return params.data[TABLE_COLUMNS.INVENTORY_LIST.remainingQty];
          },
          type: 'numberColumn',
          sortable: true,
        },
        {
          headerName: 'Unit price',
          field: TABLE_COLUMNS.INVENTORY_LIST.price,
          valueGetter: (params) => {
            return params.data[TABLE_COLUMNS.INVENTORY_LIST.price];
          },
          valueSetter: (params) => {
            params.data[TABLE_COLUMNS.INVENTORY_LIST.price] = params.newValue;
          },
          type: 'numberColumn',
          sortable: true,
        },
      ],
      defaultColDef: {
        width: 150,
        editable: true,
        filter: 'agTextColumnFilter',
        floatingFilter: true,
        resizable: true,
      },
      columnTypes: {
        numberColumn: {
          width: 130,
          filter: 'agNumberColumnFilter',
        },
        nonEditableColumn: {editable: false},
        dateColumn: {
          filter: 'agDateColumnFilter',
          filterParams: {
            comparator: dateComparator,
          },
        },
      },
      isFullWidthCell: true,
    },
  },
};
