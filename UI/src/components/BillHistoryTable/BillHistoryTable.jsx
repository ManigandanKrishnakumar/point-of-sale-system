import React, {useState} from 'react';
import './BillHistoryTable.scss';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import {AppEndpointError, AppLoader, AppTable} from '../shared';
import {TABLES} from '../../constants/datatable-constants';
import {useBillHistory} from '../../custom-hooks';
import {ItemsList} from '..';

export default () => {
  const [billHistory, loading, error, getBillHistory] = useBillHistory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState();
  const onRowClicked = (data) => {
    setSelectedBill(data);
    setIsModalOpen(true);
  };
  const onModalClose = () => {
    setSelectedBill();
    setIsModalOpen(false);
  };
  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return <AppEndpointError onTryAgain={getBillHistory} />;
  }
  return (
    <div className="bill-history-container">
      <AppTable
        tableConfig={TABLES.BILL_HISTORY}
        data={billHistory}
        tableDatumTitle="Bill"
        isModalOpen={isModalOpen}
        onRowClicked={onRowClicked}
        onModalClose={onModalClose}
        modalHeaderEndSlot={
          selectedBill ? <BillNumber selectedBill={selectedBill} /> : null
        }
        modalContentComponent={
          selectedBill ? (
            <BillRowModalContent selectedBill={selectedBill} />
          ) : null
        }
        modalFooterComponent={
          selectedBill ? (
            <BillRowModalFooter selectedBill={selectedBill} />
          ) : null
        }
      />
    </div>
  );
};

const BillNumber = ({selectedBill}) => {
  return (
    <div className="bill-number-container">
      <span className="label bill-num-label">Bill number : </span>
      <span className="value">{selectedBill.BILL_ID}</span>
    </div>
  );
};

const BillRowModalContent = ({selectedBill}) => {
  return (
    <>
      <div className="tax-info-container">
        <div className="tax-info-sgst">
          <span className="label">SGST: </span>
          <span className="value"> {selectedBill.SGST + ' %'}</span>
        </div>
        <div className="tax-info-cgst">
          <span className="label">CGST: </span>
          <span className="value"> {selectedBill.CGST + ' %'}</span>
        </div>
      </div>
      <ItemsList
        items={JSON.parse(selectedBill.ITEMS).items}
        totalPrice={selectedBill.TOTAL_COST}
        showActualUnitPrice={true}
        readMode={true}
      />
    </>
  );
};

const BillRowModalFooter = ({selectedBill}) => {
  return (
    <div className="bill-row-footer">
      <div className="bill-row-footer-date">
        <span className="label">Date: </span>
        <span className="value">
          {new Date(selectedBill.CREATION_DATE).toLocaleDateString()}
        </span>
      </div>

      <div className="bill-row-footer-name">
        <span className="label">Customer Name: </span>
        <span className="value"> {selectedBill.CUSTOMER_NAME}</span>
      </div>

      <div className="bill-row-footer-phone">
        <span className="label">Customer Phone: </span>
        <span className="value"> {selectedBill.PHONE_NUMBER}</span>
      </div>
    </div>
  );
};
