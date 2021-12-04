import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


export class LoggerMiddleware implements NestMiddleware {
  use (request: Request, response: Response, next: NextFunction) : void {
    console.log('request.hostname :>> ', request.hostname);
    console.log('request.baseUrl :>> ', request.baseUrl);
    console.log('request.headers :>> ', request.headers);

    return next();
  }
}