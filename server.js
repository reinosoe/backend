import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import initialRoles from "./app/utils/createRoles.js";
import db from "./app/models/index.js";
import UserRouter from './app/routes/UserRouter.js';
import { API_VERSION, IP_SERVER, PORT_DB } from './config.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


// RUTAS

// Ruta principal
app.get('/', (req, res) => {
    res.json({"message": "Hola desde la API"});
});

//Ruta usuarios
app.use(`/api/${API_VERSION}/users`, UserRouter);


const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/cultivo`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        initialRoles();
        app.listen(PORT, () => console.log(`Server running on port: ${PORT}, http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`));
    })
    .catch((error) => console.log(error.message));
