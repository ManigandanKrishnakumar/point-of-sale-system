import express, {Response, Request, Router, NextFunction} from 'express';
import {CONSTANTS} from '../constants/route-constants/routes-constants';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';
export const UtilsRouter: Router = express.Router();
import * as fs from 'fs';
const privateKEY = fs.readFileSync('./private.key', 'utf8');
const publicKEY = fs.readFileSync('./public.key', 'utf8');

//validates each request for jwt token
export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log('validateToken');
  const authorizationHeader = req.headers.authorization;
  let result: any;
  if (authorizationHeader) {
    let token = <string>req.headers.authorization;
    try {
      token = token.replace(CONSTANTS.TOKEN_SALT, '');
      result = verify(token);
      console.log(result);
      req.body.userID = result['phoneNumber'];
      next();
    } catch (err) {
      throw new Error(err);
    }
  } else {
    result = JSON.stringify({
      error: `Authentication error. Token required.`,
      status: 401,
    });
    res.status(401).send(result);
  }
};

/**
 *
 * @param data : input string for hashing
 * @param alphaNumeric : boolean value to set whether the output string should contain alphabets
 * @param length : length of the output string
 */
export const randomStringGenerator = (
  data: string,
  alphaNumeric: Boolean,
  length: number,
) => {
  let result = '';
  let md5 = crypto.createHash('md5');
  let sha256 = crypto.createHash('sha256');
  do {
    let characters =
      md5.update(data).digest('base64') +
      sha256.update(data).digest('base64') +
      Math.random() * 100000;
    if (!alphaNumeric) {
      characters = characters.replace(/\D/g, '');
    }
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  } while (result.length != length);
  return result;
};

var signOptions = {
  issuer: 'Billing by FSSCOM',
  expiresIn: '12h',
  algorithm: 'RS256',
};

export const getToken = (payload: any) => {
  return jwt.sign(
    payload,
    <jwt.Secret>privateKEY,
    <jwt.SignOptions>signOptions,
  );
};

export const verify = (token: any) => {
  return jwt.verify(token, <jwt.Secret>publicKEY, {
    ignoreExpiration: true, //handled by OAuth2 server implementation
  });
};

//get current time
export const getCurrentTimeStamp = () => {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
};
