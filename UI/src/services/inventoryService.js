import {END_POINTS} from '../api/apiConstants';
import bloomerangApi from '../api/bloomerangApi';
import {TABLE_COLUMNS} from '../constants/datatable-constants';

export const fetchInventoryList = async (onSuccess, onError) => {
  try {
    const result = await bloomerangApi.get(
      END_POINTS.INVENTORY.GET_INVENTORY_LIST,
    );
    console.log(result.data);
    return {
      error: false,
      data: result.data,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};

export const updateInventoryItem = async (
  updatedRow,
  updatedColumn,
  updatedValue,
  oldValue,
) => {
  const body = {
    id: updatedRow[TABLE_COLUMNS.INVENTORY_LIST.itemId],
    name: updatedRow[TABLE_COLUMNS.INVENTORY_LIST.itemName],
    qty: updatedRow[TABLE_COLUMNS.INVENTORY_LIST.remainingQty],
    unitPrice: updatedRow[TABLE_COLUMNS.INVENTORY_LIST.price],
    newId: updatedRow[TABLE_COLUMNS.INVENTORY_LIST.itemId],
  };

  try {
    if (updatedColumn === TABLE_COLUMNS.INVENTORY_LIST.itemId) {
      body.newId = updatedValue;
      body.id = oldValue;
    }
    await bloomerangApi.post(END_POINTS.INVENTORY.UPDATE_INVENTORY_ITEM, body);
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      errorCode: error.response.data.code,
    };
  }
};

export const addInventory = async (productData) => {
  const body = {
    items: [
      {
        id: productData.productId,
        name: productData.productName,
        qty: productData.quantity,
        unitPrice: productData.unitPrice,
      },
    ],
  };

  try {
    await bloomerangApi.post(END_POINTS.INVENTORY.ADD_INVENTORY, body);
    return {
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      errorCode: error.response.data.code,
    };
  }
};
