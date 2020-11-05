import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import BillingPage from '../pages/BillingPage/BillingPage';
import InventoryPage from '../pages/InventoryDashboard/InventoryPage';

export default () => {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/billing" />} />
      <Route path="/billing" component={BillingPage} />
      <Route path="/inventory" component={InventoryPage} />
    </Switch>
  );
};
