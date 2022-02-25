import express from 'express';
import loginRouter from './routes/user.js';
import registerRouter from './routes/register.js'
import validationRouter from './routes/validation.js'

const router = express.Router();

router.use('/api/login', loginRouter)
router.use('/api/register', registerRouter)
router.use('/api/validation', validationRouter)
export default router
