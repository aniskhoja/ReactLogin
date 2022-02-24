// import logger from '../logger/logger.js';
import User, {validateUser, validateLogin} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js'


const getUserLogin =  async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(400).send("Invalid email and password");

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send("Invalid email and password");
        
        //setup token
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message)
        logger.error(err.message)
        res.status(401).send(err.message)
    }
}

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

        //redirect to login
        //send email for verification
    } catch (err) {
        console.log(err.message)
        logger.error(err.message)
        res.status(401).send(err.message)
    }

};

export {getUserLogin, getUserRegister}