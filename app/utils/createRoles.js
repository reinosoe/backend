import Role from '../models/Rol.js'
import RolController from "../controllers/RolController.js";

function initialRoles() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {

            RolController.create({"name": "user"})
                .then(r => console.log("Rol 'User' creado"))
                .catch(err => {});

            RolController.create({"name": "config"})
                .then(r => console.log("Rol 'Configurador' creado"))
                .catch(err => {})

            RolController.create({"name": "manager"})
                .then(r => console.log("Rol 'Manejador' creado"))
                .catch(err => {})

            RolController.create({"name": "admin"})
                .then(r => console.log("Rol 'Administrador' creado"))
                .catch(err => {});

        }
    });
}

export default initialRoles;
