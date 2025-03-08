import mongoose from "mongoose";

const MONGO_URI = 'INFORME SEU SQL AQUI'

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB conectado!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao MongoDB:", error);
        process.exit(1);
    }
};
