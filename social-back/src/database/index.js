import mongoose from "mongoose"
const MONGO_URI = 'mongodb://127.0.0.1:27017/social'

export async function connectToDB() {
    await mongoose.connect(MONGO_URI);
}