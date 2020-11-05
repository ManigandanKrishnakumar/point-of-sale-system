import React, {useContext, useState} from 'react';
import './AddInventoryView.scss';

import {Button, Input} from '../../../components/shared';
import {InventoryContext} from '../../../state/contexts/InventoryContext';
import {addInventory} from '../../../services/inventoryService';
import {INVENTORY_ACTIONS} from '../../../state/constants/action-names';

const INITIAL_FORM_VALUE = {
  productId: '',
  productName: '',
  quantity: 0,
  unitPrice: 0,
};

export default () => {
  const {data, dispatch} = useContext(InventoryContext);
  const [addInventoryForm, setAddInventoryForm] = useState(INITIAL_FORM_VALUE);
  const onSubmit = async () => {
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_LOADING, payload: true});
    const result = await addInventory(addInventoryForm);
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_LOADING, payload: false});
    dispatch({type: INVENTORY_ACTIONS.SET_UPDATE_ERROR, payload: result});
    if (!data.isUpdateError.error) {
      setAddInventoryForm(INITIAL_FORM_VALUE);
    }
  };

  return (
    <div className="add-inventory-form">
      <div className="inputs-container">
        <Input
          type="text"
          label="Product Id"
          value={addInventoryForm.productId}
          onChange={(value) =>
            setAddInventoryForm((prevState) => {
              return {...prevState, productId: value};
            })
          }
        />

        <Input
          type="text"
          label="Product Name"
          value={addInventoryForm.productName}
          onChange={(value) =>
            setAddInventoryForm((prevState) => {
              return {...prevState, productName: value};
            })
          }
        />

        <Input
          type="number"
          label="Qty"
          value={addInventoryForm.quantity}
          onChange={(value) =>
            setAddInventoryForm((prevState) => {
              return {...prevState, quantity: value};
            })
          }
        />

        <Input
          type="number"
          label="Unit Price"
          value={addInventoryForm.unitPrice}
          onChange={(value) =>
            setAddInventoryForm((prevState) => {
              return {...prevState, unitPrice: value};
            })
          }
        />
      </div>
      <div className="button-wrapper">
        <Button title="Add" onPress={onSubmit} />
      </div>
    </div>
  );
};
