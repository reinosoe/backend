import mongoose from "mongoose";

const Predio = mongoose.model(
    "Predio",
    new mongoose.Schema({
        area: Number,
        latitud: String,
        longitud: String,
        usuarioGestor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: false
        }
    })
);

export default Predio;
