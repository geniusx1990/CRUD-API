import * as http from "http";
import * as url from "url";
import 'dotenv/config';
import {router} from './router/router';
import * as cluster from "cluster";
const pid = process.pid;
const server = http.createServer();

server.on('request', (request, response) => {
    const parseURL = url.parse(request.url, true);
    const pathName = parseURL.pathname;
    if (pathName.startsWith('/api')) {
        router(request, response);
    } else {
        response.writeHead(404, {'Content-Type': 'application/json'});
        response.end(JSON.stringify({
            message: '404. Sorry, this page never existed.',
        }));
    }
});

server.listen((Number(process.env.PORT) + pid), () => {
    console.log(`Worker listening on port ${Number(process.env.PORT) + pid} pid = ${pid}`);

});
