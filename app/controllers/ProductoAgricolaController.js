import ProductoAgricolaModel from '../models/ProductoAgricola.js'
const ProductoAgricolaController = {}

// CREAR Y GUARDAR PRODUCTO AGRICOLA
ProductoAgricolaController.create = async (req, res) => {
    if (
        !req.body.nombre ||
        !req.body.valorSemilla ||
        !req.body.valorAgua ||
        !req.body.valorFertilizanteHectarea
    ) {
        res.status(400).send({
            message: 'Hay contenido que no puede estar vacío!',
        })
        return
    }

    const productoAgricola = new ProductoAgricolaModel({
        nombre: req.body.nombre,
        valorSemilla: req.body.valorSemilla,
        valorAgua: req.body.valorAgua,
        valorFertilizanteHectarea: req.body.valorFertilizanteHectarea,
    })

    productoAgricola
        .save()
        .then((productoAgricola) => {
            res.send({
                message: 'Producto Agricola creado correctamente',
                productoAgricola: productoAgricola,
            })
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err || 'Ocurrió un error al crear un Producto Agricola',
            })
        })
}

// TRAER TODOS LOS PRODUCTOS AGRICOLA
ProductoAgricolaController.findAll = async (req, res) => {
    try {
        const productosAgricola = await ProductoAgricolaModel.find()
        res.status(200).json(productosAgricola)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// TRAER UN PRODUCTO AGRICOLA CON UN ID
ProductoAgricolaController.findOne = async (req, res) => {
    try {
        const productoAgricola = await ProductoAgricolaModel.findById(
            req.params.id
        )
        res.status(200).json(productoAgricola)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// ACTUALIZAR UN PRODUCTO AGRICOLA POR ID
ProductoAgricolaController.update = async (req, res) => {
    if (
        !req.body.nombre &&
        !req.body.valorSemilla &&
        !req.body.valorAgua &&
        !req.body.valorFertilizanteHectarea
    ) {
        res.status(400).send({
            message: 'Los datos a actualizar no deben estar vacíos!',
        })
        return
    }

    const id = req.params.id

    ProductoAgricolaModel.findByIdAndUpdate(
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
                    message: `Producto Agricola no encontrado.`,
                })
            }
        }
    )

    res.send({ message: 'Producto Agricola Actualizado' })
}

// ELIMINAR PRODUCTO AGRICOLA
ProductoAgricolaController.destroy = async (req, res) => {
    await ProductoAgricolaModel.findByIdAndRemove(req.params.id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Producto Agricola no encontrado.`,
                })
            } else {
                res.send({
                    message: 'Producto Agricola eliminado correctamente!',
                })
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message,
            })
        })
}

export default ProductoAgricolaController
