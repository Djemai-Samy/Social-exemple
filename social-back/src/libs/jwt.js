import jwt from 'jsonwebtoken';

const SECRET_KEY = "hG6LVrtvTPjRsiVfGW1tSUId44c6TcbF9dfuEy9o67gmXkoLF1Wlekk11TGulYxI";
const EXPIRES_IN = 60 * 60 * 24 * 7;

export const JWT = {
  sign: (payload) => {
    const token = jwt.sign({ data: payload }, SECRET_KEY, { expiresIn: EXPIRES_IN });
    return token
  },
  verify: (token) => {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return { success: true, payload: decoded };
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return { success: false, message: 'TOKEN_EXPIRED' };
      }
      if (err.name === "JsonWebTokenError") {
        return { success: false, message: 'TOKEN_INVALID' };
      }
    }
  }
}