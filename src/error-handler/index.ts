import * as HttpStatus from 'http-status';
import { Logger } from '../logger';
import { NextFunction, Response, Request } from 'express';

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    Logger.error(error.message, { error, url: req.originalUrl, body: req.body, params: req.params });

    if (error.name === 'UnauthorizedError') {
        return res.status(HttpStatus.UNAUTHORIZED).send('Invalid Token');
    }

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
}
