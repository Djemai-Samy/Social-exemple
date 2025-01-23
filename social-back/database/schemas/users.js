import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarURL: { type: String }
});

export const UserModel = mongoose.model('Users', UserSchema);