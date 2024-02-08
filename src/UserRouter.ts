import userController from "./controllers/UserController";

export const userRouter = (request, response) => {

    const {method, url} = request;
    const userId = url.split("/")[3]
    switch (method) {

        case 'GET':
            if (userId) {
                userController.getUserById(request, response)
            } else {
                userController.getUsers(request, response);
            }
            break;

        case 'POST':
            userController.createUser(request, response);
            break;

        case 'PUT':
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: `Update user with ID ${userId}`}));
            break;
        case 'DELETE':

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: `Delete user with ID ${userId}`}));
            break;

        default:
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('Method not supported');
            break;
    }

}