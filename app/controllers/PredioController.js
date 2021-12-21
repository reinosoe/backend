import PredioModel from '../models/Predio.js'
import UserModel from '../models/User.js'
import RolModel from '../models/Rol.js'
const PredioController = {}

// CREAR Y GUARDAR PREDIO
PredioController.create = async (req, res) => {
    if (!req.body.nombre || !req.body.municipio || !req.body.hectareas || !req.body.latitud || !req.body.longitud) {
        res.status(400).send({
            message: 'Hay contenido que no puede estar vacío!',
        })
        return
    }

    const predios = new PredioModel({
        nombre: req.body.nombre,
        municipio: req.body.municipio,
        hectareas: req.body.hectareas,
        latitud: req.body.latitud,
        longitud: req.body.longitud,
    })

    predios.save()
        .then(() => {
            res.send({
                message: 'Predio creado correctamente',
                predio: predios,
            })
        })
        .catch((err) => {
            res.status(500).send({
                message: err || 'Ocurrió un error al crear un predio',
            })
        })
}

// TRAER TODOS LOS PREDIOS
PredioController.findAll = async (req, res) => {
    try {
        const predios = await PredioModel.find()
        res.status(200).json(predios)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// TRAER UN PREDIO CON UN ID
PredioController.findOne = async (req, res) => {
    try {
        const predio = await PredioModel.findById(req.params.id)
        res.status(200).json(predio)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// ACTUALIZAR UN PREDIO POR ID
PredioController.update = async (req, res) => {
    if (
        !req.body.nombre &&
        !req.body.municipio &&
        !req.body.hectareas &&
        !req.body.latitud &&
        !req.body.longitud
    ) {
        res.status(400).send({
            message: 'Los datos a actualizar no deben estar vacíos!',
        })
        return
    }

    const id = req.params.id

    PredioModel.findByIdAndUpdate(
        id,
        req.body,
        { useFindAndModify: false },
        (err, predio) => {
            if (err) {
                res.status(500).send({
                    message: err,
                })
                return
            }

            if (!predio) {
                res.status(404).send({
                    message: `Predio no encontrado.`,
                })
            }

            res.send({ message: 'Predio Actualizado', predio: predio })
        }
    )

}

PredioController.destroy = async (req, res) => {
    await PredioModel.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Predio no encontrado.`,
                })
            } else {
                res.send({
                    message: 'Predio eliminado correctamente!',
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            })
        })
}

export default PredioController
