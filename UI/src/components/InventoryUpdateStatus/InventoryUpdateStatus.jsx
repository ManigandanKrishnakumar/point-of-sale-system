import React, {useContext} from 'react';
import {ERROR_MSGS} from '../../constants/app-constants';
import {InventoryContext} from '../../state/contexts/InventoryContext';
import {AppLoader} from '../shared';
import './InventoryUpdateStatus.scss';

export default () => {
  const {data} = useContext(InventoryContext);
  console.log(data);
  return (
    <div className="inventory-update-status-container">
      {data.isUpdateLoading ? <AppLoader size="small" /> : null}

      {data.isUpdateError.error ? (
        <p className="error-message">
          {ERROR_MSGS[data.isUpdateError.errorCode] ||
            ERROR_MSGS.DEFAULT_API_ERR}
        </p>
      ) : null}
    </div>
  );
};
