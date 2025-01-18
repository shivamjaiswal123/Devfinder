import { Router } from "express";
import { signin, signup } from "../controller/user.controller";
import { inputValidationMiddleware } from "../middleware/input.validation.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router()

router.route('/signup').post(inputValidationMiddleware,signup)
router.route('/signin').post(inputValidationMiddleware,signin)
router.route('/').get(authMiddleware,)

export default router