import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    phone: { type: Number, required: true },
    date: { type: String, default: new Date().toISOString() }
})

export const serviceModel = mongoose.model("Service", serviceSchema, 'users');