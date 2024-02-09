import {v4 as uuidv4} from 'uuid';
import {database} from '../db/db';
import IUser from "../utils/interfaces";

class UserService {
    async getAllData() {
        return database;
    }

    async getUserById(userId) {
        const result = database.find((user) => (user.id) == userId);
        return result || null;
    }

    async createNewUser(username, age, hobbies) {
        const id = uuidv4();
        const newUser: IUser = {
            id: id,
            username: username,
            age: age,
            hobbies: hobbies
        }

        try {
            database.push(newUser);
            return newUser;
        } catch (error) {
            return {success: false, error: "Failed to create new user"};
        }
    }

    async updateUserData(userId, username, age, hobbies) {
        try {
            const user: IUser = await this.getUserById(userId);
            if (user === null) {
                return  null
            } else {
                user.age = age;
                user.username = username;
                user.hobbies = hobbies;
                return user;
            }

        } catch (error) {
            return {success: false, error: "Failed to update user"}
        }
    }

}

export default new UserService();