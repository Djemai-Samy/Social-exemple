import express from 'express';
import { UserRepository } from '../database/repositories/users-repository.js';
import { Hasher } from '../libs/hash.js';

export const UserController = express.Router();

UserController.post('/register', async (req, rep) => {

    const { email, password } = req.body;

    if (email === "" || password.length < 6) {
        return rep.status(400).json({ message: "INVALID_DATA" });
    }

    const userFromDB = await UserRepository.findByEmail(email);

    if (userFromDB) {
        return rep.status(401).json({ message: "INVALID_CREDENTIAL" });
    }
    const hashedPassword = await Hasher.hash(password);

    const savedUser = await UserRepository.create({ email, password: hashedPassword });
    return rep.json({ message: "USER_CREATED" });
})