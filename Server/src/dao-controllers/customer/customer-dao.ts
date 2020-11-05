import {executeQuery} from '../utility/dao-utility/database-utlity';
import {QUERIES} from '../../constants/dao-constants/queries';

/**
 * add new bill to billing table
 */
export const addCustomer = async (
  paramsList: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    const addStatus = await executeQuery(
      QUERIES.CUSTOMER.ADD_CUSTOMER,
      paramsList,
    );
    success(addStatus);
  } catch (addCustomerError) {
    console.log('ERROR AT ADD Customer', addCustomerError);
    error(addCustomerError);
  }
};

/**
 * Search and return all items from the database
 */
export const searchCustomer = async (
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    const searchStatus = await executeQuery(
      QUERIES.CUSTOMER.SEARCH_CUSTOMER,
      paramValues,
    );
    success(searchStatus);
  } catch (searchCustomerError) {
    console.log('ERROR AT SEARCH CUSTOMER', searchCustomerError);
    error(searchCustomerError);
  }
};

export const checkExistingCustomer = async (
  paramValues: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    const checkStatus = await executeQuery(
      QUERIES.CUSTOMER.EXISTING_CUSTOMER,
      paramValues,
    );
    success(checkStatus);
  } catch (checkCustomerError) {
    console.log('ERROR AT CHECKING EXISTING CUSTOMER', checkCustomerError);
    error(checkCustomerError);
  }
};

export const updateCustomerVisit = (paramValues: Array<Object>) => {
  try {
    executeQuery(QUERIES.CUSTOMER.UPDATE_CUSTOMER_VISIT, paramValues);
  } catch (checkCustomerError) {
    console.log('ERROR AT CHECKING EXISTING CUSTOMER', checkCustomerError);
  }
};
