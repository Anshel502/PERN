import express from "express";
import router from "./router";
import db from "./config/db";


async function conectDb() {
    try {
        await db.authenticate();
        db.sync();
        console.log("Conexion a base de daatos exitosa");

    } catch (error) {
        console.log(error);
        console.log("Se registro un error en la conexion")
    }
}
conectDb()

const server = express();
server.use(express.json());
server.use("/api", router);

export default server;
