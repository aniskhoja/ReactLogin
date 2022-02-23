import express from 'express';
import { getUserLogin } from '../controllers/userControl.js';


const router = express.Router();

//login route
router.route('/').post(getUserLogin);


export default router;