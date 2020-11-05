import express, {Response, Request, Router} from 'express';
import {ROUTE_CONSTANTS} from '../../constants/route-constants/routes-constants';
import {
  addItemToInventory,
  deleteItemFromInventory,
  updateInventory,
  searchInventory,
} from '../../modules/inventory/inventory';
import {ResponseObject} from '../../interfaces/common-interfaces';
// get instance of express router
export const InventoryRouter: Router = express.Router();

InventoryRouter.post(
  ROUTE_CONSTANTS.INVENTORY.ADD_ITEM,
  (req: Request, res: Response) => {
    addItemToInventory(req.body, (addItemResult: ResponseObject) => {
      if (addItemResult.success) {
        res.status(200).send(addItemResult.data);
      } else {
        res.status(400).send(addItemResult.error);
      }
    });
  },
);

InventoryRouter.get(
  ROUTE_CONSTANTS.INVENTORY.GET_ITEM,
  (req: Request, res: Response) => {
    searchInventory(req.query, (getItemsResult: ResponseObject) => {
      if (getItemsResult.success) {
        res.status(200).send(getItemsResult.data);
      } else {
        res.status(400).send(getItemsResult.error);
      }
    });
  },
);

InventoryRouter.post(
  ROUTE_CONSTANTS.INVENTORY.DELETE_ITEM,
  (req: Request, res: Response) => {
    deleteItemFromInventory(req.body, (deleteResult: ResponseObject) => {
      if (deleteResult.success) {
        res.status(200).send(deleteResult.data);
      } else {
        res.status(400).send(deleteResult.error);
      }
    });
  },
);

InventoryRouter.post(
  ROUTE_CONSTANTS.INVENTORY.UPDATE_ITEM,
  (req: Request, res: Response) => {
    updateInventory(req.body, (updateResult: ResponseObject) => {
      if (updateResult.success) {
        res.status(200).send(updateResult.data);
      } else {
        res.status(400).send(updateResult.error);
      }
    });
  },
);
