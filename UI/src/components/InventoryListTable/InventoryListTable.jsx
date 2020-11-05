import React, {useContext} from 'react';
import {useInventoryList} from '../../custom-hooks';
import './InventoryListTable.scss';

import {AppEndpointError, AppLoader, AppTable} from '../shared';
import {TABLES} from '../../constants/datatable-constants';
import {updateInventoryItem} from '../../services/inventoryService';
import {InventoryContext} from '../../state/contexts/InventoryContext';
import {INVENTORY_ACTIONS} from '../../state/constants/action-names';

export default () => {
  const {dispatch} = useContext(InventoryContext);
  const [inventoryList, loading, error, getInventoryList] = useInventoryList();

  const onEdit = async (data) => {
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_LOADING, payload: true});
    const result = await updateInventoryItem(
      data.data,
      data.column.colId,
      data.newValue,
      data.oldValue,
    );
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_LOADING, payload: false});
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_ERROR, payload: result});
  };
  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return <AppEndpointError onTryAgain={getInventoryList} />;
  }

  return (
    <div className="inventory-list-container">
      <AppTable
        tableConfig={TABLES.INVENTORY_LIST}
        data={inventoryList}
        onEditComplete={onEdit}
      />
    </div>
  );
};
