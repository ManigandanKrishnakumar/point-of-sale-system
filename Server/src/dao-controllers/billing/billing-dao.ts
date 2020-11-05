import {executeQuery} from '../utility/dao-utility/database-utlity';
import {QUERIES} from '../../constants/dao-constants/queries';

/**
 * add new bill to billing table
 */
export const addBill = async (
  paramsList: Array<Object>,
  success: Function,
  error: Function,
) => {
  try {
    const addStatus = await executeQuery(QUERIES.BILLING.ADD_BILL, paramsList);
    success(addStatus);
  } catch (addBillError) {
    console.log('ERROR AT ADD BILL', addBillError);
    error(addBillError);
  }
};

/**
 * Search and return all items from the database
 */
export const getBills = async (
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
  } catch (searchBillError) {
    console.log('ERROR AT SEARCH BILL', searchBillError);
    error(searchBillError);
  }
};
