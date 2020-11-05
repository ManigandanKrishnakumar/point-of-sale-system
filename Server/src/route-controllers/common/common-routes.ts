import express, {Response, Request, Router} from 'express';
import {ROUTE_CONSTANTS} from '../../constants/route-constants/routes-constants';
// get instance of express router
export const CommonRouter: Router = express.Router();

CommonRouter.post(ROUTE_CONSTANTS.BASE_URL, (req: Request, res: Response) => {
  res.status(200).send({});
});
