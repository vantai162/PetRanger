import {Router} from "express";
import {createPet, getPets, getPetById} from "../controllers/pet.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
const router = Router();

router.post("/add",verifyToken, createPet);
router.get("/", getPets);
router.get("/:id", getPetById);

export default router;