import mongoose from "mongoose";

const ProductoAgricola = mongoose.model(
    "ProductoAgricola",
    new mongoose.Schema({
        nombre: String,
        valorSemilla: Number,
        valorAgua: Number,
        valorFertilizanteHectarea: Number,
    })
);

export default ProductoAgricola;
