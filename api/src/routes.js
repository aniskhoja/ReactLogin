import express from 'express';
import loginRouter from './routes/user.js';
import registerRouter from './routes/register.js'
const router = express.Router();

router.use('/api/login', loginRouter)
router.use('/api/register', registerRouter)

export default router
