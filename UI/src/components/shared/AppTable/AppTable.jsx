import React, {useState, useEffect} from 'react';
import './AppTable.scss';

import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import {DATA_TABLE_CONFIG} from '../../../constants/datatable-constants';
import {AppModal} from '..';

export default ({
  data,
  tableConfig,
  tableDatumTitle,
  isModalOpen,
  onRowClicked,
  onModalClose,
  modalHeaderEndSlot,
  modalContentComponent,
  modalFooterComponent,
  onEditComplete,
}) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridOptions] = useState(DATA_TABLE_CONFIG[tableConfig].GRID_OPTIONS);

  const onReady = (params) => {
    setGridApi(params.api);
  };

  useEffect(() => {
    if (gridApi) gridApi.sizeColumnsToFit();
  }, [gridApi]);

  return (
    <div className="app-table-container fade-in">
      <div className="ag-theme-alpine-dark data-table">
        <AgGridReact
          rowData={data}
          columnDefs={gridOptions.columnDefs}
          defaultColDef={gridOptions.defaultColDef}
          defaultColGroupDef={gridOptions.defaultColGroupDef}
          columnTypes={gridOptions.columnTypes}
          onGridReady={onReady}
          onRowClicked={onRowClicked ? (e) => onRowClicked(e.data) : () => {}}
          pagination={true}
          paginationPageSize="25"
          onCellEditingStopped={onEditComplete ? onEditComplete : () => {}}
          animateRows
        />
      </div>
      <AppModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        title={tableDatumTitle}
        headerEndSlot={modalHeaderEndSlot}
        content={modalContentComponent}
        footer={modalFooterComponent}
      />
    </div>
  );
};
