import url from "url";
import {userRouter} from "./UserRouter";
export const router = (request, response) => {
    const parseURL = url.parse(request.url, true);
    const pathName = parseURL.pathname;

    const parts = pathName.split('/');
    const endpoint = parts[2];

    switch (endpoint) {
        case 'users':
            userRouter(request, response);
            break;

        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end('404. Sorry, this page never existed');
            break;
    }
}