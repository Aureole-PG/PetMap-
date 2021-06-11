import mongoose from 'mongoose'
const petSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'nombre es requerido'],
        trim: true,
    },
    user_id:{
        type: String,
        required: [true, 'email es requerido'],
        trim: true
    },
    tipo: {
        type: String,
        required: [true, 'email es requerido'],
        trim: true
    },
    raza: {
        type: String,
        required: [true, 'password es requerido'],
        trim: true,
    },
    gps_id: {
        type: String,
        required: [true, 'password es requerido'],
        trim: true,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.models.pet || mongoose.model('pet', petSchema);

