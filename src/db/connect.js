const mongoose = require("mongoose")
const dotEnv = require("dotenv")
dotEnv.config()

const connect_db = () => {

    return mongoose.connect(process.env.URL_DB)
}

module.exports = connect_db