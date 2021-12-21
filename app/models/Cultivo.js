import mongoose from "mongoose";

const Cultivo = mongoose.model(
    "Cultivo",
    new mongoose.Schema({
        predio: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Predio",
        },
        hectareas: Number,
        producto: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductoAgricola",
        }
    })
);

export default Cultivo;
