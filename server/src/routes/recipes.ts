import express, { Response } from "express";
import { authMiddleware, AuthRequest } from "../middleware/middleware";
import Recipe from "../models/Recipe";

const router = express.Router();

router.post(
  "/create-recipe",
  authMiddleware,
  async (req: AuthRequest, res: Response) => {
    try {
      const { title, description, difficulty } = req.body;

      if (!title || !description || !difficulty) {
        res.status(400).json({ message: "All fields are required." });
        return;
      }

      const newlyCreated = new Recipe({
        title,
        description,
        difficulty,
        createdBy: req.userId,
        createdAt: new Date(),
      });

      await newlyCreated.save();

      res.status(201).json({
        message: "Recipe created successfully",
        recipe: newlyCreated,
      });
    } catch (error) {
      console.error("Error creating recipe:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router