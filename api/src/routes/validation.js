import express from 'express';
import { getValidate } from '../controllers/userControl.js';


const router = express.Router();

//login route
router.route('/').post(getValidate);


export default router;