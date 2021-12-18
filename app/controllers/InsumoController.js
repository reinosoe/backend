import CultivoModel from '../models/Cultivo.js'
import InsumoModel from '../models/Insumo.js'
const InsumoController = {}

// CREAR Y GUARDAR INSUMO
InsumoController.create = async (req, res) => {
    if (
        !req.body.cultivo ||
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

    const insumo = new InsumoModel({
        nSemillas: req.body.nSemillas,
        tiempoCultivo: req.body.tiempoCultivo,
        agua: req.body.agua,
        fertilizante: req.body.fertilizante,
        tiempoRecoleccion: req.body.tiempoRecoleccion,
        productoRecolectado: req.body.productoRecolectado,
        tiempoProxSiembra: req.body.tiempoProxSiembra,
    })

    insumo.save((err, insumo) => {
        if (err) {
            res.status(500).send({
                message: err || 'Ocurrió un error al crear un Insumo',
            })
            return
        }

        // ASIGNAR CULTIVO
        if (req.body.cultivo) {
            try {
                const cultivo = CultivoModel.findById(req.body.cultivo)
                insumo.cultivo = req.body.cultivo
            } catch (err) {
                res.status(404).json({ message: err.message })
                return
            }
        }

        // Guardar y enviar
        insumo.save((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            }

            res.send({
                message: 'Insumo creado correctamente',
                insumo: insumo,
            })
        })
    })
}

// TRAER TODOS LOS INSUMOS
InsumoController.findAll = async (req, res) => {
    try {
        const insumos = await InsumoModel.find()
        res.status(200).json(insumos)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// TRAER UN INSUMO CON UN ID
InsumoController.findOne = async (req, res) => {
    try {
        const insumo = await InsumoModel.findById(req.params.id)
        res.status(200).json(insumo)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// ACTUALIZAR UN INSUMO POR ID
InsumoController.update = async (req, res) => {
    if (
        !req.body.cultivo &&
        !req.body.nSemillas &&
        !req.body.tiempoCultivo &&
        !req.body.agua &&
        !req.body.fertilizante &&
        !req.body.tiempoRecoleccion &&
        !req.body.productoRecolectado &&
        !req.body.tiempoProxSiembra
    ) {
        res.status(400).send({
            message: 'Los datos a actualizar no deben estar vacíos!',
        })
        return
    }

    const id = req.params.id

    InsumoModel.findByIdAndUpdate(
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
                    message: `Insumo no encontrado.`,
                })
            }
        }
    )

    res.send({ message: 'Insumo Actualizado' })
}

InsumoController.destroy = async (req, res) => {
    await InsumoModel.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Insumo no encontrado.`,
                })
            } else {
                res.send({
                    message: 'Insumo eliminado correctamente!',
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            })
        })
}

export default InsumoController
