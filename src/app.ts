import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { respondWithWarning } from './utils/error.utils';
import router from './routes/index.route';


const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());


interface Error {
    status?: number;
    message: string;
}


app.use('/api/v1', router);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found') as Error;
    error.status = 404;
    next(error);
});

if (process.env.NODE_ENV === 'development') {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        return respondWithWarning(res, error.status || 500, error.message, error);
    });
} else {
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(error);
        return respondWithWarning(res, error.status || 500, error.message || 'something bad happened, please try again', {});
    });
}

export default app;