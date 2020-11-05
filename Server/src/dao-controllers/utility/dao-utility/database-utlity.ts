import * as mysql from 'mysql';
import {APP_CONFIG} from '../../../config/app-config';

const dbPool: mysql.Pool = mysql.createPool({
  host: APP_CONFIG.CURRENT_ENV.DB.HOST,
  user: APP_CONFIG.CURRENT_ENV.DB.USER,
  password: APP_CONFIG.CURRENT_ENV.DB.password,
  database: APP_CONFIG.CURRENT_ENV.DB.database,
  multipleStatements: true,
});

export const executeQueries = (
  query: string,
  paramsList: Array<Array<Object>>,
) => {
  return new Promise((resolve, reject) => {
    try {
      dbPool.getConnection(function (err, connection) {
        connection.beginTransaction(function (err) {
          if (err) {
            //Transaction Error (Rollback and release connection)
            connection.rollback(function () {
              connection.release();
              //Failure
              return reject(err);
            });
          } else {
            connection.query(query, [paramsList], function (error, results) {
              if (error) {
                console.log(error);
                console.log('rolling back');
                connection.rollback(function () {
                  connection.release();
                  return reject(error);
                  //Failure
                });
              } else {
                console.log('commiting the transaction');
                connection.commit(function (err) {
                  if (err) {
                    connection.rollback(function () {
                      connection.release();
                      return reject(err);
                      //Failure
                    });
                  } else {
                    connection.release();
                    return resolve(results);
                    //Success
                  }
                });
              }
            });
          }
        });
      });
    } catch (exception) {
      console.log('ERROR IN DATABASE CONNECTION :: ', exception);
      return reject(exception);
    }
  });
};

/**
 * Opens connection and executes a query and closes connections
 * @param query string
 * @param params Array<string>
 */
export const executeQuery = (query: string, params?: Array<Object>) => {
  return new Promise((resolve, reject) => {
    try {
      dbPool.query(query, params, (error, resultData) => {
        if (error) {
          console.log('DATABASE ERROR ::', error);
          return reject(error);
        }
        return resolve(resultData);
      });
    } catch (error) {
      console.log('ERROR IN DATABASE CONNECTION :: ', error);
      return reject(error);
    }
  });
};
