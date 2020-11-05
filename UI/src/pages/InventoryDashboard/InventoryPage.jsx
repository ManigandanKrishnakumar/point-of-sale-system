import React, {useContext} from 'react';
import './InventoryPage.scss';
import {Header, InventoryUpdateStatus, PageNavBar} from '../../components';
import {PAGE_CONSTANTS} from '../../constants/app-constants';
import {
  InventoryContext,
  InventoryContextProvider,
} from '../../state/contexts/InventoryContext';
import {VIEWS} from '../../views';

const InventoryPage = () => {
  return (
    <InventoryContextProvider>
      <div className="inventory-container fade-in">
        <Header
          heading={PAGE_CONSTANTS.INVERNTORY.HEADING}
          midSlot={
            <PageNavBar
              context={InventoryContext}
              views={PAGE_CONSTANTS.INVERNTORY.VIEWS}
            />
          }
          endSlot={<InventoryUpdateStatus />}
        />
        <ViewRenderer />
      </div>
    </InventoryContextProvider>
  );
};

export default InventoryPage;

const ViewRenderer = () => {
  const {data} = useContext(InventoryContext);
  return VIEWS.INVENTORY[data.view];
};
