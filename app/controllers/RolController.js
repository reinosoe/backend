import RolModel from '../models/Rol.js';
const RolController = {}

// CREAR Y GUARDAR UN ROL
RolController.create = async (req, res) => {
    // Validar campos vacíos
    if (!req.name) {
        res.status(400).send({ message: "Hay contenido que no puede estar vacío!" });
    }

    // crear instancia de Rol
    const rol = new RolModel({
        name: req.name,
    });

    //guardar y ...
    await rol.save()
        .then()
        .catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrió un error al crear un Rol"
        });
    });
};

// TRAER TODOS LOS ROLES
RolController.findAll = async (req, res) => {
    try {
        const user = await RolModel.find();
        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};

export default RolController;
