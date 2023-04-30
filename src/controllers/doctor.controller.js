const Doctores = require("../model/Doctor.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotEnv = require("dotenv")
const { search } = require("../routes/api")
const { json } = require("express")

dotEnv.config()

// FUNCIÓN AGREGAR DOCTOR
const add_doctor_new = async(req, res) => {

    let data = req.body
    let searchData = await Doctores.findOne({ dni: data.dni })
    if(searchData) return res.json({ "estado": false })

    let password = req.body.password
    req.body.password = await bcrypt.hash(password, 8)
    
    const jsonWT = await jwt.sign({ dni: req.body.dni }, process.env.SECRET_JWT_ADMIN)
    const doctores = await Doctores.create(data)
    res.json(jsonWT)

}

// LISTAR PACIENTES
const get_doctores = async(req, res) => {

    const doctores = await Doctores.find()
    res.json(doctores)
}

//LISTAR-UNO DOCTOR
const get_doctor = async(req, res) => {

    const id = req.params.id
    let paciente = await Doctores.findOne({ _id: id })
    res.json(paciente)
}

// LOGIN DOCTOR
const login = async(req, res) => {

    let data = req.body
    let searchData = await Doctores.findOne({ dni: req.body.dni })
    if(!searchData) return res.json({ estado: false })
    let password = data.passsword

    let validate = await bcrypt.compare(password, searchData.password)
    if(!validate) return res.json({ estado: false })
    
    const jsonWT = await jwt.sign({ dni: req.body.dni }, process.env.SECRET_JWT)
    res.json(jsonWT)
}


module.exports = { add_doctor_new, get_doctores, get_doctor, login }