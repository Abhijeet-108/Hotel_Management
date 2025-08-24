import { Router } from "express";
import { createReview, updateReview, deleteReview } from "../controllers/review.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/create-review").post(authenticate, createReview);

router.route("/update-review/:id").put(authenticate, updateReview);
router.route("/delete-review/:id").delete(authenticate, deleteReview);

export default router;