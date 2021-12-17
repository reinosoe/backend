import mongoose from "mongoose";

const User = mongoose.model(
    "User",
    new mongoose.Schema({
        name: String,
        email: String,
        password: String,
        status: Boolean,
        roles: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
        }

    })
);

export default User;
