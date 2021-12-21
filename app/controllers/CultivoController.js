import PredioModel from '../models/Predio.js'
import ProductoAgricolaModel from '../models/ProductoAgricola.js'
import CultivoModel from '../models/Cultivo.js'
const CultivoController = {}

// CREAR Y GUARDAR CULTIVO
CultivoController.create = async (req, res) => {
    if (
        !req.body.predio ||
        !req.body.hectareas ||
        !req.body.producto ||
        !req.body.nSemillas ||
        !req.body.tiempoCultivo ||
        !req.body.agua ||
        !req.body.fertilizante ||
        !req.body.tiempoRecoleccion ||
        !req.body.productoRecolectado ||
        !req.body.tiempoProxSiembra
    ) {
        res.status(400).send({
            message: 'Hay contenido que no puede estar vacío!',
        })
        return
    }

    const cultivo = new CultivoModel({
        hectareas: req.body.hectareas,
        producto: req.body.producto,
        nSemillas: req.body.nSemillas,
        tiempoCultivo: req.body.tiempoCultivo,
        agua: req.body.agua,
        fertilizante: req.body.fertilizante,
        tiempoRecoleccion: req.body.tiempoRecoleccion,
        productoRecolectado: req.body.productoRecolectado,
        tiempoProxSiembra: req.body.tiempoProxSiembra   
    })

    cultivo.save((err, cultivo) => {
        if (err) {
            res.status(500).send({
                message: err || 'Ocurrió un error al crear un predio',
            })
            return
        }

        // ASIGNAR PREDIO
        if (req.body.predio) {
            try {
                const predio = PredioModel.findById(req.body.predio)
                cultivo.predio = req.body.predio
            } catch (err) {
                res.status(404).json({ message: err.message })
            }
        }

        // Guardar y enviar
        cultivo.save((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            res.send({
                message: 'Cultivo creado correctamente',
                cultivo: cultivo,
            })
        })
    })
}

// TRAER TODOS LOS CULTIVOS
CultivoController.findAll = async (req, res) => {
    try {
        const cultivos = await CultivoModel.find()
        res.status(200).json(cultivos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// TRAER UN CULTIVO CON UN ID
CultivoController.findOne = async (req, res) => {
    try {
        const cultivo = await CultivoModel.findById(req.params.id)
        res.status(200).json(cultivo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// ACTUALIZAR UN CULTIVO POR ID
CultivoController.update = async (req, res) => {
    if (
        !req.body.predio &&
        !req.body.hectareas &&
        !req.body.producto &&
        !req.body.fechaInicio
    ) {
        res.status(400).send({
            message: 'Los datos a actualizar no deben estar vacíos!',
        })
        return
    }

    const id = req.params.id

    CultivoModel.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false },
        (err, cultivo) => {
            if (err) {
                res.status(500).send({
                    message: err,
                })
                return
            }

            if (!cultivo) {
                res.status(404).send({
                    message: `Cultivo no encontrado.`,
                })
            }
        }
    )

    res.send({ message: 'Cultivo Actualizado' })
}

CultivoController.destroy = async (req, res) => {
    await CultivoModel.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cultivo no encontrado.`,
                })
            } else {
                res.send({
                    message: 'Cultivo eliminado correctamente!',
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            })
        })
}

export default CultivoController
