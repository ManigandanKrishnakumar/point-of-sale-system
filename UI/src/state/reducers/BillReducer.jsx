import {BILL_ACTIONS, COMMON_ACTIONS} from '../constants/action-names';
import {INITIAL_BILL_STATE} from '../constants/inital-states';

export const billReducer = (state, action) => {
  switch (action.type) {
    case BILL_ACTIONS.SET_SGST: {
      console.log(action);
      const tax = {sgst: parseFloat(action.payload), cgst: state.tax.cgst};
      const total = getTotal(state.items, tax);
      return {
        ...state,
        tax,
        total,
      };
    }

    case BILL_ACTIONS.SET_CGST: {
      const tax = {sgst: state.tax.sgst, cgst: parseFloat(action.payload)};
      const total = getTotal(state.items, tax);
      return {
        ...state,
        total,
        tax,
      };
    }

    case BILL_ACTIONS.ADD_ITEM: {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (index < 0) {
        return {
          ...state,
          total: getTotal([...state.items, action.payload], state.tax),
          items: [...state.items, action.payload],
        };
      } else {
        const itemsArray = JSON.parse(JSON.stringify(state.items));
        itemsArray[index].qty = itemsArray[index].qty + 1;
        return {
          ...state,
          total: getTotal(itemsArray, state.tax),
          items: itemsArray,
        };
      }
    }

    case BILL_ACTIONS.BILL_RESET: {
      return {...INITIAL_BILL_STATE};
    }

    case BILL_ACTIONS.REMOVE_ITEM: {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      const itemsArray = JSON.parse(JSON.stringify(state.items));
      itemsArray.splice(index, 1);
      return {
        ...state,
        total: getTotal(itemsArray, state.tax),
        items: itemsArray,
      };
    }

    case BILL_ACTIONS.INCR_OR_QTY: {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      const itemsArray = JSON.parse(JSON.stringify(state.items));
      itemsArray[index].qty = itemsArray[index].qty + action.payload.add;
      if (
        itemsArray[index].qty > 0 &&
        itemsArray[index].qty <= itemsArray[index].remaningQty
      ) {
        return {
          ...state,
          total: getTotal(itemsArray, state.tax),
          items: itemsArray,
        };
      } else if (itemsArray[index].qty <= 0) {
        itemsArray.splice(index, 1);
        return {
          ...state,
          total: getTotal(itemsArray, state.tax),
          items: itemsArray,
        };
      } else {
        return state;
      }
    }

    case BILL_ACTIONS.SET_UNIT_PRICE: {
      const itemsArray = JSON.parse(JSON.stringify(state.items));
      const index = itemsArray.findIndex(
        (item) => item.id === action.payload.id,
      );
      itemsArray[index].billUnitPrice = parseInt(action.payload.value);
      return {
        ...state,
        total: getTotal(itemsArray, state.tax),
        items: itemsArray,
      };
    }

    case BILL_ACTIONS.SET_PAYMENT_METHOD: {
      return {...state, paymentMethod: action.payload};
    }

    case BILL_ACTIONS.SET_CUSTOMER_PHONE: {
      if (action.payload.includes('e')) {
        return state;
      }
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          phone: action.payload.slice(0, 10),
        },
      };
    }

    case BILL_ACTIONS.SET_CUSTOMER_NAME: {
      return {
        ...state,
        customerInfo: {
          ...state.customerInfo,
          name: action.payload,
        },
      };
    }

    case COMMON_ACTIONS.SET_VIEW: {
      return {
        ...state,
        view: action.payload,
      };
    }

    default:
      return state;
  }
};

const getTotal = (items, tax) => {
  let total = 0;
  items.forEach((item) => {
    total += item.qty * item.billUnitPrice;
    total = total + (total * (tax.sgst / 100) + total * (tax.cgst / 100));
  });

  return total.toFixed(2);
};
