import { createLogger, transports, format } from 'winston';
import * as moment from 'moment';

const { combine, timestamp, printf } = format;
const customFormat = printf(info =>  `[${moment(info.timestamp).format('DD/MM/YYYY HH:mm:ss')}]-[${info.level}]: ${info.message}`);

export const Logger = createLogger({
    exitOnError: false,
    format: combine(timestamp(), customFormat),
    transports: [new transports.Console()]
});
