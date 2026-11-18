import Vacante from "../models/Vacante.model";
import { Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const createVacante = async (req: Request, res: Response) => {
    await body("titulo")
        .notEmpty().withMessage("El título es obligatorio").run(req);

    await body("empresa")
        .notEmpty().withMessage("La empresa es obligatoria").run(req);

    await body("requisitos")
        .optional()
        .isArray().withMessage("Los requisitos deben ser un arreglo").run(req);

    await body("modalidad")
        .optional()
        .isIn(["presencial", "remoto", "hibrido"])
        .withMessage("Modalidad no válida").run(req);

    await body("tipoContrato")
        .optional()
        .isIn(["tiempo_completo", "medio_tiempo", "temporal", "practicas", "freelance"])
        .withMessage("Tipo de contrato no válido").run(req);

    await body("salarioMin")
        .optional()
        .isNumeric().withMessage("El salario mínimo debe ser un número")
        .custom(value => value >= 0).withMessage("El salario mínimo no puede ser negativo").run(req);

    await body("salarioMax")
        .optional()
        .isNumeric().withMessage("El salario máximo debe ser un número")
        .custom((value, { req }) => {
            if (req.body.salarioMin !== undefined && Number(value) < Number(req.body.salarioMin)) {
                throw new Error("El salario máximo no puede ser menor al mínimo");
            }
            return true;
        }).run(req);

    await body("plazasDisponibles")
        .optional()
        .isInt({ min: 1 }).withMessage("Debe haber al menos 1 plaza").run(req);

    await body("fechaLimite")
        .optional()
        .isISO8601().withMessage("La fecha debe tener formato AAAA-MM-DD").run(req);

    await body("activa")
        .optional()
        .isBoolean().withMessage("activa debe ser true o false").run(req);

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const vacante = await Vacante.create(req.body);
        res.status(201).json({ data: vacante });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "No se pudo crear la vacante" });
    }
}

export const updateVacante = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        const vacante = await Vacante.findByPk(id);

        if (!vacante) {
            return res.status(404).json({ error: "Vacante no encontrada" });
        }

        await vacante.update(req.body);

        res.status(200).json({ data: vacante });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Hubo un error al actualizar la vacante" });
    }
}