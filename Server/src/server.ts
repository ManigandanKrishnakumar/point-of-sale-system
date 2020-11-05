import express, {Application, Request, Response} from 'express';
import {setCORSHeaders} from './middlewares/CORS/cors-middleware';
import {json, urlencoded} from 'body-parser';
import {config} from 'dotenv';
import {ROUTE_CONSTANTS} from './constants/route-constants/routes-constants';
import {CommonRouter} from './route-controllers/common/common-routes';
import {InventoryRouter} from './route-controllers/inventory/inventory-routes';
import {BillingRouter} from './route-controllers/billing/billing-routes';
import {APP_CONFIG} from './config/app-config';
import {schedule} from 'node-cron';
import {exec} from 'child_process';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs';

const PORT: string | number = process.env.PORT || 80;
const app: Application = express();

var dir = './tmp';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

var dumpDir = './dump';
if (!fs.existsSync(dumpDir)) {
  fs.mkdirSync(dumpDir);
}

var logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
var accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), {
  flags: 'a',
});

config();

// App Middlewares
app.use((req: Request, res: Response, next: Function) => {
  setCORSHeaders(req, res, next);
});

//middleware to parse the request body sent as plain text into json
app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

//middleware to log the request
app.use(
  morgan('combined', {
    stream: accessLogStream,
  }),
);

app.use(ROUTE_CONSTANTS.BASE_URL, CommonRouter);
app.use(ROUTE_CONSTANTS.BILLING.BASE_URL, BillingRouter);
app.use(ROUTE_CONSTANTS.INVENTORY.BASE_URL, InventoryRouter);

schedule('0 0 * * *', function () {
  console.log('here');
  var datetime = new Date();
  var child = exec(
    ' mysqldump -u' +
      APP_CONFIG.CURRENT_ENV.DB.USER +
      ' -p' +
      APP_CONFIG.CURRENT_ENV.DB.password +
      ' ' +
      APP_CONFIG.CURRENT_ENV.DB.database +
      ' > ' +
      dumpDir +
      '/' +
      APP_CONFIG.CURRENT_ENV.DB.dumpFileName +
      datetime.toISOString().slice(0, 10) +
      '.sql',
  );
  console.log(child);
});

app.use(express.static(__dirname + '/public/build'));

// routes segregation
// Start Server
const server = app.listen(PORT, () => {
  console.log('Server Started ... in ' + PORT);
});
