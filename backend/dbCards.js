import mongoose from "mongoose";

const accountSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
})

export default mongoose.model("accounts", accountSchema);