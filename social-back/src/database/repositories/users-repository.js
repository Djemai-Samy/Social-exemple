import { UserModel } from "../schemas/users.js"

export const UserRepository = {
    findByEmail: async (email) => {
        const userFromDB = await UserModel.findOne({ email });
        return userFromDB;
    },
    findByID: async (id) => {
        const userFromDB = await UserModel.findById(id);
        return userFromDB;
    },
    create: async (userData) => {
        const newUser = new UserModel(userData);
        const savedUser = await newUser.save();
        return savedUser;
    }
}