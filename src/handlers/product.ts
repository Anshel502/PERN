import Product from "../models/Product.model";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createProduct = async (req: Request, res: Response) => {

   
    await body("name")
        .notEmpty().withMessage("El nombre del producto es obligatorio").run(req);

    await body("price")
        .notEmpty().withMessage("El precio es obligatorio")
        .isNumeric().withMessage("El precio debe ser un número")
        .custom(value => value > 0).withMessage("El precio debe ser mayor a 0").run(req);

    await body("availability")
        .optional()
        .isBoolean().withMessage("availability debe ser true o false").run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });

    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear el producto" });
    }
}