const express = require("express")
const app = express()
const dotEnv = require("dotenv")
const cors = require("cors")
const routerApi = require("./routes/api")
const db_connect = require("./db/connect")

// config

dotEnv.config()
const PORT = process.env.PORT || 3000

// middleware

app.use(express.json())
app.use(cors())

// DB

db_connect()
    .then(() => console.log("DB conectada..."))
    .catch(() => console.log("Error DB..."))

// routes

app.use("/", routerApi)

//

app.listen(PORT, () =>console.log("Servidor corriendo " + PORT + "..."))