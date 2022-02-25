import express from 'express';
import { getPassReset, getUserLogin } from '../controllers/userControl.js';


const router = express.Router();

//login route
router.route('/').post(getUserLogin);
router.route('/reset').post(getPassReset);


export default router;