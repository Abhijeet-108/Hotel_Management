import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware.js";
import {getCoordinates, getAutoCompleteSuggestion} from '../controllers/map.controller.js';
import { query } from 'express-validator';

const router = Router();

router.get(
    '/get_coordinates',
    [
        query('address')
        .isString()
        .withMessage('Address must be string')
        .isLength({min:3})
        .withMessage('Addres must be at leats 3 chararcter long')
    ],
    getCoordinates
);

router.get(
    '/get_suggestion',
    [
        query('input')
        .isString()
        .isLength({min:3})
    ],
    getAutoCompleteSuggestion
);

export default router;
