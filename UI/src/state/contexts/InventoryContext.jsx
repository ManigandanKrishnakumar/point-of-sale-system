import React, {useReducer} from 'react';
import {INITIAL_INVENTORY_STATE} from '../constants/inital-states';
import {inventoryReducer} from '../reducers';

export const InventoryContext = React.createContext();

export const InventoryContextProvider = ({children}) => {
  const [data, dispatch] = useReducer(
    inventoryReducer,
    INITIAL_INVENTORY_STATE,
  );

  return (
    <InventoryContext.Provider value={{data, dispatch}}>
      {children}
    </InventoryContext.Provider>
  );
};
