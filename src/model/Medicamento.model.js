const mongoose = require("mongoose")
const Schema = mongoose.Schema

const medicamentoSchema = new Schema(
    {
        "nombre-medicamento": String,
        "dosis": String,
        "unidad-medida": String,
        "forma-farmaceutica": String,
        "resumen":String,
        "descripcion":String
    },
    {
        versionKey: false
    }
)

const modelMedicamentos = mongoose.model("medicamentos", medicamentoSchema)

module.exports = modelMedicamentos