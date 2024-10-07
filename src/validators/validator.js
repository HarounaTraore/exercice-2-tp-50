import { check, validationResult } from "express-validator";
import { Task } from "../models/Task.js";

export const validationTask = [
  check("titre")
    .isString()
    .isLength({ min: 3, max: 30 })
    .withMessage("Au moins 3 caractères pour le titre!"),
  check("description")
    .isString()
    .isLength({ min: 5, max: 50 })
    .withMessage("Au moins 5 caractère pour la description !"),
  check("completed")
    .optional()
    .isBoolean()
    .withMessage("completed est de type boolean"),
];

