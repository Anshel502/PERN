import { Router } from "express";
import { createProduct, updateProduct } from "./handlers/product";
import { createVacante, updateVacante } from "./handlers/vacante"; 

const router = Router();

router.get("/", (req, res) => {
    res.send("Desde get");
});

router.post("/products", createProduct);
router.post("/vacantes", createVacante); 

router.put("/products/:id", updateProduct);
router.put("/vacantes/:id", updateVacante);

router.delete("/", (req, res) => {
    res.send("Desde DELETE");
});

export default router;