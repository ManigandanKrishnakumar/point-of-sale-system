import {
  addItems,
  searchItems,
  deleteItems,
  updateItem,
  updateItems,
} from '../../dao-controllers/inventory/inventory-dao';
import {ResponseObject, ItemData} from '../../interfaces/common-interfaces';

export const getParamsList = (items: Array<ItemData>) => {
  let paramsList: Array<Array<Object>> = new Array<Array<Object>>();
  for (let i = 0; i < items.length; i++) {
    let params: Array<Object> = new Array<Object>();
    if (items[i].id != null) {
      params.push(items[i].id);
      if (items[i].name != null) {
        params.push(items[i].name);
        if (items[i].qty != null) {
          params.push(items[i].qty);
          if (items[i].unitPrice != null) {
            params.push(items[i].unitPrice);
            params.push('1'); //user id need to get from JWT
            paramsList.push(params);
          }
        }
      }
    }
  }
  return paramsList;
};

export const addItemToInventory = (
  requestBody: any,
  addItemResult: Function,
) => {
  let result: ResponseObject = new ResponseObject();
  if (requestBody != null && requestBody.items != null) {
    let paramsList = getParamsList(requestBody.items);
    addItems(
      paramsList,
      (success: any) => {
        result.success = true;
        result.data = success;
        addItemResult(result);
      },
      (error: any) => {
        result.success = false;
        result.error = error;
        addItemResult(error);
      },
    );
  } else {
    result.success = false;
    result.error = 'invalid request body';
    addItemResult(result);
  }
};

// export const getItemsFromInventory = (
//   requestBody: any,
//   getItemsResult: Function,
// ) => {
//   let returnData: ResponseObject = new ResponseObject();
//   if (requestBody != null && requestBody.searchData != null) {
//     let filterData: TableFilter = {
//       searchData: JSON.parse(requestBody.searchData.toString()),
//       sortData: JSON.parse(requestBody.sortData.toString()),
//       startRange: requestBody.sortRange,
//       pageLength: parseInt(requestBody.pageLength()),
//     };
//     console.log(filterData);
//     let resultData = getSearchQuery(QUERIES.INVENTORY.GET_ITEM, filterData);
//     getItems(
//       resultData.queryString,
//       resultData.paramsList,
//       (result: any) => {
//         returnData.success = true;
//         returnData.data = result;
//         getItemsResult(returnData);
//       },
//       (error: any) => {
//         returnData.success = false;
//         returnData.error = error;
//         getItemsResult(returnData);
//       },
//     );
//   } else {
//     returnData.success = false;
//     returnData.error = 'invalid request body';
//     getItemsResult(returnData);
//   }
// };

export const searchInventory = (requestBody: any, searchResult: Function) => {
  let result: ResponseObject = new ResponseObject();
  let paramsList: Array<Object> = new Array<Object>();
  if (requestBody != null && requestBody.searchData != null) {
    paramsList.push('%' + requestBody.searchData + '%');
    paramsList.push('%' + requestBody.searchData + '%');
  } else {
    paramsList.push('%%');
    paramsList.push('%%');
  }
  searchItems(
    paramsList,
    (success: any) => {
      result.success = true;
      result.data = success;
      searchResult(result);
    },
    (error: any) => {
      result.success = false;
      result.error = error;
      searchResult(error);
    },
  );
};

export const deleteItemFromInventory = (
  requestBody: any,
  deleteResult: Function,
) => {
  let returnData: ResponseObject = new ResponseObject();
  if (requestBody != null && requestBody.items != null) {
    deleteItems(
      [requestBody.items],
      (result: any) => {
        returnData.success = true;
        returnData.data = result;
        deleteResult(returnData);
      },
      (error: any) => {
        returnData.success = false;
        returnData.error = error;
        deleteResult(returnData);
      },
    );
  } else {
    returnData.success = false;
    returnData.error = 'invalid request body';
    deleteResult(returnData);
  }
};

export const updateInventory = (requestBody: any, updateResult: Function) => {
  let returnData: any = {};
  if (requestBody != null && requestBody.id != null) {
    let params: Array<Object> = new Array<Object>();
    params.push(requestBody.newId);
    params.push(requestBody.name);
    params.push(requestBody.qty);
    params.push(requestBody.unitPrice);
    params.push(1); //user id need to get from JWT
    params.push(requestBody.id);
    updateItem(
      params,
      (result: any) => {
        returnData.success = true;
        returnData.data = result;
        updateResult(returnData);
      },
      (error: any) => {
        console.log('failed');
        returnData.success = false;
        returnData.error = error;
        updateResult(returnData);
      },
    );
  } else {
    returnData.success = false;
    returnData.error = 'invalid request body';
    updateResult(returnData);
  }
};

export const updateOnBilling = (requestBody: any, updateResult: Function) => {
  let result: ResponseObject = new ResponseObject();
  if (requestBody != null && requestBody.items != null) {
    let paramsList = getParamsList(requestBody.items);
    updateItems(
      paramsList,
      (success: any) => {
        result.success = true;
        result.data = success;
        updateResult(result);
      },
      (error: any) => {
        result.success = false;
        result.error = error;
        updateResult(error);
      },
    );
  } else {
    result.success = false;
    result.error = 'invalid request body';
    updateResult(result);
  }
};
