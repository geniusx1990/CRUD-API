import UserService from "../services/UserService";
import {handleJsonBody} from '../utils/handleJsonBody';
class UserController {
    async getUsers(request, response) {
        try {
            const users = await UserService.getAllData();

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({users: users}));
        } catch (error) {
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({error: 'Internal Server Error'}));
        }
    }

    async getUserById(request, response) {
        const userId = request.url.split('/')[3]
        const user = await UserService.getUserById(userId);

        if (isNaN(Number(userId)) || Number(userId) <= 0) {
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({message: "Invalid userId"}));
            return;
        }

        try {

            if (user === null) {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: "User doesn't exist"}));
            } else {
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(JSON.stringify(user));
            }

        } catch (error) {
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({error: 'Internal Server Error'}));
        }

    }

    async createUser(request, response) {
        handleJsonBody(request, async (error, body) => {
            if (error) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({ error: 'Invalid JSON in request body' }));
            } else {
                const { username, age, hobbies } = body;

                try {
                    const newUser = await UserService.createNewUser(username, age, hobbies);

                    response.writeHead(201, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify(newUser));
                } catch (error) {
                    response.writeHead(500, {'Content-Type': 'application/json'});
                    response.end(JSON.stringify({ error: 'Internal Server Error' }));
                }
            }
        });

    }

}

export default new UserController();