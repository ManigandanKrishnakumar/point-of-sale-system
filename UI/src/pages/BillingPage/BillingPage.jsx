import React, {useContext} from 'react';
import './BillingPage.scss';

import {Header, PageNavBar, TaxInfo} from '../../components';
import {PAGE_CONSTANTS} from '../../constants/app-constants';
import {
  BillContext,
  BillContextProvider,
} from '../../state/contexts/BillContext';
import {VIEWS} from '../../views';

const BillingPage = () => {
  return (
    <BillContextProvider>
      <div className="bill-page-container fade-in">
        <Header
          heading={PAGE_CONSTANTS.BILLING.HEADING}
          midSlot={
            <PageNavBar
              context={BillContext}
              views={PAGE_CONSTANTS.BILLING.VIEWS}
            />
          }
          endSlot={<TaxInfo />}
        />
        <ViewRenderer />
      </div>
    </BillContextProvider>
  );
};

export default BillingPage;

const ViewRenderer = () => {
  const {data} = useContext(BillContext);
  return VIEWS.BILLING[data.view];
};
