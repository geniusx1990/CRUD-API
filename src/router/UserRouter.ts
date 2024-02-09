import userController from "../controllers/UserController";

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
            userController.updateUser(request, response);
            break;

        case 'DELETE':
            userController.deleteUser(request, response);
            break;

        default:
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('Method not supported');
            break;
    }

}