import {COMMON_ACTIONS, INVENTORY_ACTIONS} from '../constants/action-names';

export const inventoryReducer = (state, action) => {
  switch (action.type) {
    case COMMON_ACTIONS.SET_VIEW: {
      return {
        ...state,
        view: action.payload,
      };
    }

    case INVENTORY_ACTIONS.SET_UPDATE_LOADING: {
      return {
        ...state,
        isUpdateLoading: action.payload,
      };
    }

    case INVENTORY_ACTIONS.SET_UPDATE_ERROR: {
      return {
        ...state,
        isUpdateError: action.payload,
      };
    }
    default:
      return state;
  }
};
