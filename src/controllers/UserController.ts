import {validate as uuidValidate} from 'uuid';
import UserService from "../services/UserService";
import IUser from "../utils/interfaces";
import {checkData} from "../utils/checkData";
import {parseJsonBody} from "../utils/parseJSON";

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

        if (!uuidValidate(userId)) {
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
        try {

            const body = await parseJsonBody(request);
            const {username, age, hobbies}: IUser = body;
            if (checkData(username, age, hobbies) === false) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Invalid user data. Please check the request data and try again.'}));
                return
            }

            const newUser = await UserService.createNewUser(username, age, hobbies);
            response.writeHead(201, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(newUser));

        } catch (error) {
            response.writeHead(500, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({error: 'Internal Server Error'}));
        }

    }

    async updateUser(request, response) {
        const userId = request.url.split('/')[3]

        try {
            const body = await parseJsonBody(request);
            const {username, age, hobbies}: IUser = body;
            if (!uuidValidate(userId)) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: "Invalid userId"}));
                return;
            }

            if (checkData(username, age, hobbies) === false) {
                response.writeHead(400, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: 'Invalid user data. Please check the request data and try again.'}));
                return
            }

            const userUpdated = await UserService.updateUserData(userId, username, age, hobbies);
            if (userUpdated === null) {
                response.writeHead(404, {'Content-Type': 'application/json'});
                response.end(JSON.stringify({message: "User doesn't exist"}));
                return;
            }

            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(userUpdated));

        } catch (error) {
            response.writeHead(400, {'Content-Type': 'application/json'});
            response.end(JSON.stringify({error: 'Invalid JSON in request body'}));
        }
    }
}

export default new UserController();