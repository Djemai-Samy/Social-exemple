import { JWT } from "../libs/jwt.js";

export async function verifyToken(req, rep, next) {
    const cookies = req.cookies;

    if (!cookies.access_token) {
        return rep.status(401).json({ message: "TOKEN_MISSING" });
    }
    const jwt = JWT.verify(cookies.access_token);

    if (!jwt.success) {
        return rep.status(401).json({ message: jwt.message });
    }
    rep.locals.id = jwt.payload.data.id;
    next();
}