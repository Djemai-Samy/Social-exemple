import bcrypt from "bcrypt"
const SALT = 10;
export const Hasher = {
    hash: async (plainPassword) => {
        const hashedPassword = await bcrypt.hash(plainPassword, SALT);
        return hashedPassword;
    },
    compare: async (plainPassword, hashedPassword) => {
        const isValid = await bcrypt.compare(plainPassword, hashedPassword);
        return isValid;
    }
}