import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import router from "./routes/index.js"

dotenv.config()
const server = express()

server.use(cors())
server.use(express.json())
server.use(router)

server.listen(5000)

/* 
server.listen(5000)

v v v on deploy v v v

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});
*/