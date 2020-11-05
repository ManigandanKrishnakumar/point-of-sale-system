import { BILLING_TABLE } from '../../constants/dao-constants/data-dictionary';
import {QUERIES} from '../../constants/dao-constants/queries';
import {addBill, getBills} from '../../dao-controllers/billing/billing-dao';
import {
  addCustomer,
  updateCustomerVisit,
  checkExistingCustomer,
} from '../../dao-controllers/customer/customer-dao';
import {
  ResponseObject,
  SearchData,
  TableFilterResult,
} from '../../interfaces/common-interfaces';
import {updateOnBilling} from '../inventory/inventory';
import {getSearchQuery} from '../utility/utility';

export const createBill = (
  requestBody: any,
  paramsList: any,
  callback: Function,
) => {
  let returnData: ResponseObject = new ResponseObject();
  paramsList.push(JSON.stringify({items: requestBody.items}));
  paramsList.push(requestBody.tax.cgst);
  paramsList.push(requestBody.tax.sgst);
  const itemCost =
    requestBody.total -
    (requestBody.total * (requestBody.tax.sgst / 100) +
      requestBody.total * (requestBody.tax.cgst / 100));
  paramsList.push(itemCost);
  paramsList.push(requestBody.total);
  paramsList.push(requestBody.paymentMethod);
  paramsList.push(1);
  addBill(
    paramsList,
    (success: any) => {
      let searchArr: Array<SearchData> = new Array<SearchData>();
      let searchObj: SearchData ={
        searchColumn : BILLING_TABLE.BILL_ID,
        searchString : success.insertId
      };
      searchArr.push(searchObj);
      getBillingInfo(
        {searchData : searchArr},
        (searchStatus: ResponseObject)=>{
          console.log(searchStatus);
          if(searchStatus.success){
            returnData.data = searchStatus.data;
          } else{
            returnData.error = searchStatus.error;
          }
          returnData.success = searchStatus.success
          callback(returnData);
        }
      );
    },
    (error: ResponseObject) => {
      returnData.success = false;
      returnData.error = error;
      callback(returnData);
    },
  );
};

export const addNewCustomer = (
  requestBody: any,
  paramsList: any,
  addCustomerResult: Function,
) => {
  let returnData: ResponseObject = new ResponseObject();
  if (
    requestBody.customerInfo != null &&
    requestBody.customerInfo.name != null
  ) {
    paramsList.push(requestBody.customerInfo.name);
  } else {
    paramsList.push('anonymous');
  }
  paramsList.push(1);
  addCustomer(
    paramsList,
    (success: any) => {
      paramsList = new Array<Object>();
      paramsList.push(success.insertId);
      returnData.success = true;
      returnData.data = paramsList;
      addCustomerResult(returnData);
    },
    (error: ResponseObject) => {
      returnData.success = false;
      returnData.error = error;
      addCustomerResult(returnData);
    },
  );
};

export const getCustomerId = (requestBody: any, idResult: Function) => {
  let paramsList: Array<Object> = new Array<Object>();
  let returnData: ResponseObject = new ResponseObject();
  if (
    requestBody.customerInfo != null &&
    requestBody.customerInfo.phone != null
  ) {
    paramsList.push(requestBody.customerInfo.phone);
  } else {
    paramsList.push('anonymous');
  }
  checkExistingCustomer(
    paramsList,
    (success: any) => {
      if (success != null && success[0] != null) {
        console.log('existing');
        paramsList = new Array<Object>();
        paramsList.push(success[0].CUSTOMER_ID);
        updateCustomerVisit(paramsList);
        returnData.success = true;
        returnData.data = paramsList;
        idResult(returnData);
      } else {
        console.log('new');
        addNewCustomer(
          requestBody,
          paramsList,
          (returnData: ResponseObject) => {
            idResult(returnData);
          },
        );
      }
    },
    (error: ResponseObject) => {
      returnData.success = false;
      returnData.error = error;
      idResult(returnData);
    },
  );
};

export const createAndAddBill = (requestBody: any, createResult: Function) => {
  getCustomerId(requestBody, (idData: ResponseObject) => {
    if (idData.success) {
      updateOnBilling(requestBody, (updateData: ResponseObject) => {
        if (updateData.success) {
          createBill(requestBody, idData.data, (createData: ResponseObject) => {
            createResult(createData);
          });
        } else {
          createResult(updateData);
        }
      });
    } else {
      createResult(idData);
    }
  });
};

export const getBillingInfo = (requestBody: any, getBillsResult: Function) => {
  let returnData: ResponseObject = new ResponseObject();
  let resultData: TableFilterResult;
  if (requestBody.searchData != null) {
    resultData = getSearchQuery(QUERIES.BILLING.SEARCH_GET_BILL, requestBody);
  } else {
    resultData = {queryString: QUERIES.BILLING.GET_BILL, paramsList: []};
  }
  getBills(
    resultData.queryString,
    resultData.paramsList,
    (result: ResponseObject) => {
      returnData.success = true;
      returnData.data = result;
      getBillsResult(returnData);
    },
    (error: ResponseObject) => {
      returnData.success = false;
      returnData.error = error;
      getBillsResult(returnData);
    },
  );
};
