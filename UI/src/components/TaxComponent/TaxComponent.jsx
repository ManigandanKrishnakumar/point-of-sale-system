import React, {useContext} from 'react';
import {BILL_ACTIONS} from '../../state/constants/action-names';
import {BillContext} from '../../state/contexts/BillContext';
import {ToggleInputBox} from '../shared';
import './TaxComponent.scss';

export default () => {
  const {data} = useContext(BillContext);
  return (
    <div className="tax-container">
      <ToggleInputBox
        type="number"
        label="SGST"
        action={BILL_ACTIONS.SET_SGST}
        value={data.tax.sgst}
      />
      <ToggleInputBox
        type="number"
        label="CGST"
        action={BILL_ACTIONS.SET_CGST}
        value={data.tax.cgst}
      />
    </div>
  );
};
