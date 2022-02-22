import mongoose from "mongoose";

const cardSchema = mongoose.Schema({
    name: String,
    major: String,
})

export default mongoose.model("cards", cardSchema);