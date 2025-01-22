import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { create } from "../controller/room.controller";

const router = Router()

router.route('/create').post(authMiddleware,create)

export default router