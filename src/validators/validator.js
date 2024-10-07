import { check, validationResult } from "express-validator";
import { Task } from "../models/Task.js";
import { Router } from "express";
const router = Router();

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

// Créer une nouvelle tâche
router.post("/", validationTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors de la création de la tâche" });
  }
});

// Récupérer toutes les tâches
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des tâches" });
  }
});

// Récupérer une tâche par ID
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: "Tâche non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de la tâche" });
  }
});

// Mettre à jour une tâche
router.put("/:id", validationTask, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: "Tâche non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de la tâche" });
  }
});

// Supprimer une tâche
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.json({ message: "Tâche supprimée avec succès" });
    } else {
      res.status(404).json({ error: "Tâche non trouvée" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de la tâche" });
  }
});

export default router;
