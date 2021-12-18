import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import initialRoles from './app/utils/createRoles.js'
import db from './app/models/index.js'

import UserRouter from './app/routes/UserRouter.js'
import PredioRouter from './app/routes/PredioRouter.js'
import ProductoAgricolaRouter from './app/routes/ProductoAgriculaRouter.js'
import CultivoRouter from './app/routes/CultivoRouter.js'
import InsumoRouter from './app/routes/InsumoRouter.js'

import { API_VERSION, IP_SERVER, PORT_DB } from './config.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

// RUTAS

// REDIRECCIONAR RUTA A PRINCIPAL
app.get('/', (req, res) => {
    res.redirect(`api/${API_VERSION}/`)
})

// RUTA PRINCIPAL
app.get(`/api/${API_VERSION}/`, (req, res) => {
    res.json({ message: 'Hola desde la API' })
})

//Ruta usuarios
app.use(`/api/${API_VERSION}/users`, UserRouter)
app.use(`/api/${API_VERSION}/predios`, PredioRouter)
app.use(`/api/${API_VERSION}/productos`, ProductoAgricolaRouter)
app.use(`/api/${API_VERSION}/cultivos`, CultivoRouter)
app.use(`/api/${API_VERSION}/insumos`, InsumoRouter)

// RUTAS NO ENCONTRADAS
app.all('*', (req, res) => {
    res.json({ message: 'No hay información para traer de esta ruta!' })
})

const PORT = process.env.PORT || 5000

mongoose.connect(
    `mongodb://${IP_SERVER}:${PORT_DB}/cultivo`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err)
            return
        }
        initialRoles()
        app.listen(PORT, () =>
            console.log(
                `Servidor corriendo en el puerto: ${PORT}, en la URL: http://${IP_SERVER}:${PORT}/api/${API_VERSION}/`
            )
        )
    }
)
