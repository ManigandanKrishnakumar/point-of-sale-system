import express, {Response, Request, Router} from 'express';
import {ROUTE_CONSTANTS} from '../../constants/route-constants/routes-constants';
import {createAndAddBill, getBillingInfo} from '../../modules/billing/billing';
import {ResponseObject} from '../../interfaces/common-interfaces';
// get instance of express router
export const BillingRouter: Router = express.Router();

BillingRouter.post(
  ROUTE_CONSTANTS.BILLING.ADD_BILL,
  (req: Request, res: Response) => {
    createAndAddBill(req.body, (returnData: ResponseObject) => {
      if (returnData.success) {
        res.status(200).send(returnData);
      } else {
        res.status(400).send(returnData);
      }
    });
  },
);

BillingRouter.get(
  ROUTE_CONSTANTS.BILLING.GET_BILL,
  (req: Request, res: Response) => {
    getBillingInfo(req.query, (getResult: ResponseObject) => {
      if (getResult.success) {
        res.status(200).send(getResult.data);
      } else {
        res.status(400).send(getResult.error);
      }
    });
  },
);
