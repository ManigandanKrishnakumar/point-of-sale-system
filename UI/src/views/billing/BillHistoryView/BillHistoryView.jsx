import React from 'react';
import {BillingHistoryTable} from '../../../components';
import './BillHistoryView.scss';

export default () => {
  return (
    <div className="bill-history-view-container">
      <BillingHistoryTable />
    </div>
  );
};
