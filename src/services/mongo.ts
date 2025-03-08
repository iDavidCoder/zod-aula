import mongoose from "mongoose";

const MONGO_URI = 'mongodb+srv://rootData:rootData@cluster0.e0bka.mongodb.net/users'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB conectado!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
};
