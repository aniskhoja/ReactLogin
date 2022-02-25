import express from 'express';
import { resetNewPass, getUserLogin } from '../controllers/userControl.js';


const router = express.Router();

//login route
router.route('/').post(getUserLogin);
router.route('/reset').post(resetNewPass);
// router.route('/reset/:token').post(resetValidation);


export default router;