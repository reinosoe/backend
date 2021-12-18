import mongoose from "mongoose";

const Insumo = mongoose.model(
    "Insumo",
    new mongoose.Schema({
        cultivo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cultivo",
        },
        nSemillas: Number,
        tiempoCultivo: Number,
        agua: Number,
        fertilizante: Number,
        tiempoRecoleccion: Number,
        productoRecolectado: Number,
        tiempoProxSiembra: Number
    })
);

export default Insumo;
