import { Router } from "express";
import { createBooking, cancelUserBooking, getAllBookings, getUserBookings, restoreAvailability } from "../controllers/booking.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.route("/create-booking").post(authenticate, createBooking);
router.route("/cancel-booking/:id").post(authenticate, cancelUserBooking);
router.route("/user-bookings").get(authenticate, getUserBookings);
router.route("/admin/bookings").get(authenticate, getAllBookings);
router.route("/restore-availability/:id").post(authenticate, restoreAvailability);

export default router;