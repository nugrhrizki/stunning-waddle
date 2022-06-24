import { Response } from "express";

export const createResponse = <T>(data: T, error: any) => {
  return {
    data: data,
    error: error,
  };
};

export const successResponse = <T>(res: Response, data: T) => {
  return res.json(createResponse(data, null)).end();
};

export const errorResponse = (res: Response, err: any) => {
  return res.json(createResponse(null, err)).end();
};
