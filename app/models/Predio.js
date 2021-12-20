import mongoose from "mongoose";

const Predio = mongoose.model(
    "Predio",
    new mongoose.Schema({
        nombre: {
            type: String,
            unique: true
        },
        municipio: String,
        hectareas: Number,
        latitud: String,
        longitud: String
    })
);

export default Predio;
