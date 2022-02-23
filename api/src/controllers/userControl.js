// import logger from '../logger/logger.js';
import asyncHandler from 'express-async-handler';
import User, {validateUser, validateLogin} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js'


const getUserLogin = asyncHandler((req, res) => {
    try {

    } catch (err) {
        
    }
})

const getUserRegister = async (req, res) => {
    try {
        const { error } = validateUser(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        const { username, email, password } = req.body
        const hashpass = await bcrypt.hash(password, 10)
        const user = new User({
            username,
            email,
            password: hashpass
        })
        const createUser = await user.save();
        res.status(201).send(createUser)
    } catch (err) {
        console.log(err.message)
        logger.error(err.message)
        res.status(401).send(err.message)
    }

};

export {getUserLogin, getUserRegister}