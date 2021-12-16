import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
//import postRoutes from './routes/posts.js';
import { API_VERSION, IP_SERVER, PORT_DB } from './config.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

//app.use('/posts', postRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(`mongodb://${IP_SERVER}:${PORT_DB}/cultivo`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}, http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`)))
    .catch((error) => console.log(error.message));
