import express from 'express';
import { UserRepository } from '../database/repositories/users-repository.js';
import { Hasher } from '../libs/hash.js';
import { registerValidation } from '../validations/users.js';
import { JWT } from '../libs/jwt.js';
import multer from "multer"
import { verifyToken } from '../midllewares/authentification.js';
import path from "path";

export const UserController = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/avatars/')
  },
  filename: async function (req, file, cb) {
    const cookies = req.cookies;
    const jwt = JWT.verify(cookies.access_token);
    const id = jwt.payload.data.id;
    const newFileName = id + path.extname(file.originalname);
    cb(null, newFileName);
  }
})

const upload = multer({ storage })

UserController.post('/register', async (req, rep) => {

  const { email, password } = req.body;

  const validatedData = registerValidation({ email, password });

  if (!validatedData.success) {
    return rep.status(400).json({ message: "INVALID_DATA" });
  }

  const userFromDB = await UserRepository.findByEmail(email);

  if (userFromDB) {
    return rep.status(401).json({ message: "INVALID_CREDENTIAL" });
  }
  const hashedPassword = await Hasher.hash(password);

  const savedUser = await UserRepository.create({ email, password: hashedPassword });
  return rep.json({ message: "USER_CREATED" });
});

UserController.post('/signin', async (req, rep) => {
  const { email, password } = req.body;

  // Récuperer l'utilisateur depuis la BDD
  const userFromDB = await UserRepository.findByEmail(email);
  // Tester si il existe, sinon erreur
  if (!userFromDB) {
    return rep.status(401).json({ message: "INVALID_CREDENTIAL" });
  }
  // Tester si le mot de passe est correct
  const isPasswordValid = Hasher.compare(password, userFromDB.password);
  if (!isPasswordValid) {
    return rep.status(401).json({ message: "INVALID_CREDENTIAL" });
  }

  // Créer un jwt
  const access_token = JWT.sign({ id: userFromDB._id });
  // Ajouter le token dans les cookies
  rep.cookie("access_token", access_token, { httpOnly: true, sameSite: "strict", secure: false });

  const user = {
    _id: userFromDB._id,
    email: userFromDB.email,
    avatarURL: userFromDB.avatarURL
  }

  // retourner le access_token, et les données de l'utilisateur
  return rep.json({ message: "SINGIN_SUCCESSFUL", access_token: access_token, user })
})

UserController.get('/me', async (req, rep) => {
  const cookies = req.cookies;

  if (!cookies.access_token) {
    return rep.status(401).json({ message: "TOKEN_MISSING" });
  }
  const jwt = JWT.verify(cookies.access_token);

  if (!jwt.success) {
    return rep.status(401).json({ message: jwt.message });
  }

  const id = jwt.payload.data.id;
  const userFromDB = await UserRepository.findByID(id);

  return rep.json(userDTO(userFromDB));
});

UserController.get('/logout', async (req, rep) => {
  rep.clearCookie('access_token');
  return rep.json({ message: "LOGOUT_SUCCESSFUL" })
});

UserController.post('/profile', verifyToken, upload.single('avatar'), async function (req, rep) {
  const userFromDB = await UserRepository.findByID(rep.locals.id);
  userFromDB.avatarURL = req.file.filename;
  await userFromDB.save()
  rep.json({
    message: "AVATAR_UPLOADED",
    user: userDTO(userFromDB)
  })
});

function userDTO(user) {
  return { email: user.email, avatarURL: "/avatars/" + user.avatarURL, id: user._id }
}