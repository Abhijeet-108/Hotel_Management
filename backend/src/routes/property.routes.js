import { Router } from "express";
import { addProperty, updateProperty, userProperties, getProperties, propertyById, propertyByLocation, searchProperty } from "../controllers/property.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getProperties);

router.route('/add-places').post(
    authenticate,
    upload.fields([
        {
            name: "image",
            maxCount: 1,
        },
    ]),
    addProperty
);
router.route('/user-places').get(authenticate, userProperties);
router.route('/update-place').put(updateProperty);

router.route('/:id').get(propertyById);
router.route('/search/:key').get(searchProperty)

export default router;