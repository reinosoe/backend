import mongoose from "mongoose";

const Predio = mongoose.model(
    "Predio",
    new mongoose.Schema({
        nombre: String,
        municipio: String,
        hectareas: Number,
        latitud: String,
        longitud: String
    })
);

export default Predio;
