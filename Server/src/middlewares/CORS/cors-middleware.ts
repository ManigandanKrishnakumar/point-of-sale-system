import { Request, Response } from "express";

/**
 * Sets required headers for CORS
 * @param req Express Request
 * @param res Express Response
 * @param next Function
 */
export const setCORSHeaders = (req: any, res: Response, next: Function) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
};