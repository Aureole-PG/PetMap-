import mongoose from 'mongoose'
const locationsSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: [true, 'usuario requerido'],
        trim: true,
    },
    gps_id :{
        type: String,
        required: [true, 'gps requerido'],
        trim: true,
    },
    pet_id: {
        type: String,
        required: [true, 'mascota requerido'],
        trim: true,
    },
    longitud:{
        type: String,
        required: [true, 'longitud requerido'],
        trim: true,
    },
    latitud:{
        type: String,
        required: [true, 'latitud requerido'],
        trim: true,
    },
    direccion:{
        type: String,
        trim: true,
    },
    descripcion:{
        type: String,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.models.locations || mongoose.model('locations', locationsSchema);