import { json, urlencoded } from 'body-parser';
import * as compression from 'compression';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as express from 'express';
import { errorHandler } from './error-handler';
import { Logger } from './logger';

export const app = express();
const isProd = process.env.NODE_ENV === 'prod';

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(morgan(isProd ? 'combined' : 'dev', { stream: { write: message => Logger.info(message) } }));
app.use(json());
app.use(urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});

app.use(errorHandler);
