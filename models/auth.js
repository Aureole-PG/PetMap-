import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'nombre es requerido'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'email es requerido'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password es requerido'],
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
})

module.exports = mongoose.models.User || mongoose.model('User', userSchema);


