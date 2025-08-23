import { Router } from "express";
import { createReview, updateReview, deleteReview } from "../controllers/review.controller.js";


const router = Router();

router.route("/create-review").post(createReview);

router.route("/update-review/:id").put(updateReview);
router.route("/delete-review/:id").delete(deleteReview);

export default router;