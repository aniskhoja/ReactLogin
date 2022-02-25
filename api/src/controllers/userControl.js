import User, {validateUser, validateLogin, validateToken, validateReset, validateNewPass} from '../models/userModel.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.js'
import jwt  from 'jsonwebtoken';
import mail from './../utils/mailer.js';


const getValidate = async (req, res) => {
    try {
        const { error } = validateToken(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const { token } = req.body;
        const { email } = jwt.verify(token, process.env.SECRET_KEY)
        const {id} = await User.findOne({ email })
        const isValidate = await User.findByIdAndUpdate(id , {
            validated: true,
        })
        if (!isValidate) return res.status(400).send("Your validation code is expire")
        
        res.status(200).send({message: "user is verified"})

    } catch (err) {
        logger.error(err.message)
        res.status(400).send(err.message)
    }
    
}

const resetValidation = async (req, res) => {
    console.log(req.body)
     try {
        const { error } = validateToken(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        const { token } = req.body;
        const { email } = jwt.verify(token, process.env.SECRET_KEY)
        const {id} = await User.findOne({ email })
        const isValidate = await User.findByIdAndUpdate(id , {
            validated: true,
        })
        if (!isValidate) return res.status(400).send("Your validation code is expire")
        
        res.status(200).send({message: "user is verified"})

    } catch (err) {
        logger.error(err.message)
        res.status(400).send(err.message)
    }
}


const resetNewPass = async (req, res) => {
    
    if (req.body.newPassword && req.body.userId) {
        
        try {
            const { error } = validateNewPass(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            
            
            const { newPassword, userId } = req.body;
            const hashpass = await bcrypt.hash(newPassword, 10)
            const newPassUpdated = await User.findByIdAndUpdate(userId, {
            password: hashpass
            })
            console.log()
            return res.status(201).send("Update succesfully")
        } catch (err) {
             logger.error(err.message)
            return res.status(400).send(err.message);
        };
    };

    if (req.body.token) {
        try {
            const { error } = validateToken(req.body)
            if (error) return res.status(400).send(error.details[0].message)

            const { token } = req.body;
            const { email } = jwt.verify(token, process.env.SECRET_KEY);
            const user = await User.findOne({ email });

            return res.status(200).send(user)
        } catch (err) {
            logger.error(err.message)
            return res.status(400).send(err.message);
        }
    }
    try {
        const { error } = validateReset(req.body)
        if (error) return res.status(400).send(error.details[0].message)
    
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) return res.status(404).send("Email not register. Please Sign up")

        const resetToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' })
        const url = `http://localhost:3000/reset/${resetToken}`
         try {
            mail(email, url)
        } catch (e) {
            logger.error(`sending email failed exception thrown: ${e.message}`)
        }

        res.status(200).send("Reset email sent")
    } catch (err) {
        logger.error(err.message)
        res.status(401).send(err.message)
    }
};

const getUserLogin = async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) return res.status(400).send("Invalid Email and password");

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) return res.status(400).send("Invalid Email and password");

        if(!user.validated) return res.status(400).send("Email not Verified. please check your email.")
        //setup token
        res.status(200).json(user)
    } catch (err) {
        console.log(err.message)
        logger.error(err.message)
        res.status(401).send(err.message)
    }
}

const getUserRegister = async (req, res) => {
    let emailToken, user = null;
    try {
        const { error } = validateUser(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        
        const { username, email, password } = req.body

        const isUserExist = await User.findOne({ email })
        const hashpass = await bcrypt.hash(password, 10)
        if (isUserExist) {
            if (isUserExist.validated) return res.status(400).send("You are already register. Please login")
                const id = isUserExist._id
                emailToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
                user = await User.findByIdAndUpdate(id,{
                    validate_code: emailToken,
                    username,
                    password
                });
        } else {
            emailToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: 60 * 60 })
            user = new User({
                username,
                email,
                password: hashpass,
                validate_code: emailToken
            })
        }
        const createUser = await user.save();
        const url = `http://localhost:3000/validation/${emailToken}`
        try {
            mail(email, url)
        } catch (e) {
            logger.error(`sending email failed exception thrown: ${e.message}`)
        }

        res.status(201).send(createUser)

    } catch (err) {
        console.log(err.message)
        logger.error(err.message)
        res.status(401).send(err.message)
    }
};

export {getUserLogin, getUserRegister, getValidate, resetNewPass, resetValidation}