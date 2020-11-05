import {END_POINTS} from '../api/apiConstants';
import bloomerangApi from '../api/bloomerangApi';

export const getSearchResult = async (searchTerm, onSuccess) => {
  const body = {searchData: searchTerm};
  try {
    const result = await bloomerangApi.get(END_POINTS.BILLING.SEARCH, {
      params: body,
    });
    onSuccess(result.data);
  } catch (error) {
    console.log(error);
    onSuccess([]);
  }
};

export const submitBill = async (bill, onSuccess, setLoading, setError) => {
  const body = {
    tax: bill.tax,
    items: bill.items,
    total: bill.total,
    paymentMethod: bill.paymentMethod,
    customerInfo: bill.customerInfo,
  };
  try {
    setLoading(true);
    const result = await bloomerangApi.post(END_POINTS.BILLING.ADD_BILL, body);
    setLoading(false);
    onSuccess(result.data.data[0]);
  } catch (error) {
    setLoading(false);
    setError(true);
    console.log(error);
  }
};

export const fetchBillHistory = async () => {
  try {
    const result = await bloomerangApi.get(END_POINTS.BILLING.GET_BILL);
    return {
      data: result.data,
      error: false,
    };
  } catch (error) {
    console.log(error);
    return {
      error: true,
    };
  }
};
