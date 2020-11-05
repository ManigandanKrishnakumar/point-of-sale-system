import {
  executeQueries,
  executeQuery,
} from '../utility/dao-utility/database-utlity';
import {QUERIES} from '../../constants/dao-constants/queries';

/**
 * add items to inventory table using multiple queries transaction
 */
export const addItems = async (
  paramsList: Array<Array<Object>>,
  success: Function,
  error: Function,
) => {
  try {
    const addStatus = await executeQueries(
      QUERIES.INVENTORY.ADD_ITEM,
      paramsList,
    );
    success(addStatus);
  } catch (addItemsError) {
    console.log('ERROR AT ADD ITEMS', addItemsError);
    error(addItemsError);
  }
};

/**
 * Search and return all items from the database
 */
export const getItems = async (
  queryString: string,
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    console.log(queryString);
    console.log(paramValues);
    const searchStatus = await executeQuery(queryString, paramValues);
    success(searchStatus);
  } catch (searchItemsError) {
    console.log('ERROR AT SEARCH ITEM', searchItemsError);
    error(searchItemsError);
  }
};

/**
 * Search and return all items from the database
 */
export const searchItems = async (
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    console.log(paramValues);
    const searchStatus = await executeQuery(
      QUERIES.INVENTORY.GET_ITEM,
      paramValues,
    );
    success(searchStatus);
  } catch (searchItemsError) {
    console.log('ERROR AT SEARCH ITEM', searchItemsError);
    error(searchItemsError);
  }
};

/**
 * delete items from the database
 */
export const deleteItems = async (
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    console.log(paramValues);
    const deleteStatus = await executeQuery(
      QUERIES.INVENTORY.DELETE_ITEM,
      paramValues,
    );
    success(deleteStatus);
  } catch (deleteItemsError) {
    console.log('ERROR AT DELETE ITEMS', deleteItemsError);
    error(deleteItemsError);
  }
};

/**
 * update item in the database
 */
export const updateItem = async (
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    const updateStatus = await executeQuery(
      QUERIES.INVENTORY.UPDATE_ITEM,
      paramValues,
    );
    success(updateStatus);
  } catch (updateItemError) {
    console.log('ERROR AT UPDATE ITEM', updateItemError);
    error(updateItemError);
  }
};

/**
 * update item in the database
 */
export const updateItems = async (
  paramValues: Array<Array<Object>>,
  success: Function,
  error: Function,
) => {
  try {
    console.log(paramValues);
    const updateStatus = await executeQueries(
      QUERIES.INVENTORY.UPDATE_INVENTORY,
      paramValues,
    );
    success(updateStatus);
  } catch (updateItemError) {
    console.log('ERROR AT UPDATE ITEM', updateItemError);
    error(updateItemError);
  }
};
