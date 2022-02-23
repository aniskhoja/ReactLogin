import express from 'express';
import {  getUserRegister } from '../controllers/userControl.js';


const router = express.Router();

//register route

router.route('/').post(getUserRegister);


export default router;