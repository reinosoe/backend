import mongoose from 'mongoose';
import Role from './Rol.js'
import User from './User.js'
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = User;
db.role = Role;

db.ROLES = ["user", "admin", "manager", "config"];

export default db;
