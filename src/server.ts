import { app } from './app';
import { Config } from './config';
import * as http from 'http';
import { Logger } from './logger';

const version: string = require('../package.json').version;
const port = normalizePort(Config.serverPort);

app.set('port', port);
const server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string | number) {
    const normalizedPort = parseInt(val as string, 10);

    if (isNaN(normalizedPort)) {
        // named pipe
        return val;
    }

    if (normalizedPort >= 0) {
        // port number
        return normalizedPort;
    }

    return false;
}

/**
 * Event listener for HTTP server 'error' event.
 */

function onError(error: NodeJS.ErrnoException) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind: string = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            Logger.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            Logger.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server 'listening' event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    Logger.info(`Server listening on ${bind}`);
    Logger.info(`Server Version: ${version}`);
    Logger.info(`NODE_ENV: ${process.env.NODE_ENV || '*** NODE_ENV not provided ***'}`);
}
