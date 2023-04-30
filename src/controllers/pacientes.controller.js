const Pacientes = require("../model/Pacientes.model")
const Medicamentos = require("../model/Medicamento.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")
const { search } = require("../routes/api")
const { json } = require("express")

dotEnv.config()

// FUNCIÓN AGREGAR PACIENTES
const add_pacientes_new = async(req, res) => {

    let data = req.body
    let searchData = await Pacientes.findOne({ dni: data.dni })
    if(searchData) return res.json({ "estado": false })

    let password = req.body.password
    req.body.password = await bcrypt.hash(password, 8)
    
    const jsonWT = await jwt.sign({ dni: req.body.dni }, process.env.SECRET_JWT)
    const pacientes = await Pacientes.create(data)
    res.json(jsonWT)

}

// const add_medicamentos_new = async(req, res) => {

//     let data = req.body
//     const medicamentos = await Medicamentos.create(data)
//     res.json(medicamentos)

// }

// RELACIÓN PACIENTE - MEDICAMENTO
const medicamento_paciente = async(req,res) => {

    const idPaciente = req.params.idPaciente
    let idMedicamentos = req.body.medicamentos

    let searchPaciente = await Pacientes.findOne({ _id: idPaciente })
    let searchMedicamentos;
        
    searchMedicamentos = await Medicamentos.findOne({ _id: idMedicamentos })
    searchPaciente.medicamentos.push({"nombre": searchMedicamentos["nombre"], "descripcion": searchMedicamentos["descripcion"], "fecha": req.body.fecha, "cantidad": req.body.cantidad })

    let data = await Pacientes.updateOne({ _id: idPaciente }, searchPaciente)
    console.log(searchPaciente);
    
    res.json(searchPaciente)
}

// LISTAR PACIENTES
const get_pacientes = async(req, res) => {

    const pacientes = await Pacientes.find()
    res.json(pacientes)
}


// const get_medicamentos = async(req,res)=>{

//     const medicamentos = await Medicamentos.find()
//     res.json(medicamentos)

// }

//LISTAR-UNO PACIENTE
const get_paciente = async(req, res) => {

    const id = req.params.id
    let paciente = await Pacientes.findOne({ _id: id })
    res.json(paciente)
}

// const get_medicamento = async (req, res) => {

//     let id = req.params.id
//     let medicamento = await Medicamentos.findOne({ _id: id })
//     res.json(medicamento) 
// }


// AGREGAR SEGUIMIENTO
const add_seguimiento = async(req, res) => {

    const id = req.params.id
    const data = req.body
    let searchPacienet = await Pacientes.findOne({ _id: id })
    searchPacienet.seguimiento.push(data)
    let update = await Pacientes.updateOne({ _id: id }, searchPacienet)

    res.json(update)
}

// LOGIN PACIENTE
const login = async(req, res) => {

    try{
        let data = req.body
    let searchData = await Pacientes.findOne({ dni: req.body.dni })
    if(!searchData) return res.json({ estadoc: false })
    let password = data.passsword

    let validate = await bcrypt.compare(password, searchData.password)
    if(!validate) return res.json({ estadoc: false })
    
    const jsonWT = await jwt.sign({ dni: req.body.dni }, process.env.SECRET_JWT)
    res.json({jsonWT})
    }
    catch(err){
        res.send("error token")
    }
}


module.exports = { add_pacientes_new, medicamento_paciente, get_pacientes, get_paciente, add_seguimiento, login }