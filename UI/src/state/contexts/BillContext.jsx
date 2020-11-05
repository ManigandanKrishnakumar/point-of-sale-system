import React, {useReducer} from 'react';
import {INITIAL_BILL_STATE} from '../constants/inital-states';
import {billReducer} from '../reducers';

export const BillContext = React.createContext();

export const BillContextProvider = ({children}) => {
  const [data, dispatch] = useReducer(billReducer, INITIAL_BILL_STATE);
  return (
    <BillContext.Provider value={{data, dispatch}}>
      {children}
    </BillContext.Provider>
  );
};
