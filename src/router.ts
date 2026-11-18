import { Router } from "express";
import { createProduct } from "./handlers/product";
import { createVacante } from "./handlers/vacante"; 

const router = Router();

router.get("/", (req, res) => {
    res.send("Desde get");
});

router.post("/products", createProduct);

router.post("/vacantes", createVacante); 

router.put("/", (req, res) => {
    res.send("Desde PUT");
});

router.delete("/", (req, res) => {
    res.send("Desde DELETE");
});

export default router;