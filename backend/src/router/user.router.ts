import { Router } from "express";
import { get, signin, signup, update } from "../controller/user.controller";
import { inputValidationMiddleware } from "../middleware/input.validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

router.route('/signup').post(inputValidationMiddleware,signup)
router.route('/signin').post(inputValidationMiddleware,signin)
router.route('/').get(authMiddleware,get)
router.route('/update').put(authMiddleware,update)

export default router