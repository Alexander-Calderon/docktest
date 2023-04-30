const mongoose = require("mongoose")
const Schema = mongoose.Schema

const doctorSchema = new Schema(
    {
        name: String,
        apellido: String,
        dni: String,
        correo: String,
        tel: String,
        password: String,
        
    },
    {
        versionKey: false
    }
)

const modelDoctor = mongoose.model("doctor", doctorSchema)

module.exports = modelDoctor