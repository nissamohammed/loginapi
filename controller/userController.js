const jwt = require('jsonwebtoken')

const users = require("../modal/userModel");

const bcrypt = require("bcryptjs")


//register
exports.registerController = async (req, res) => {
    console.log('inside the register controller');
    const { username, email, password } = req.body
    //console.log(username,email,password);
    //res.status(200).json('register request recieved')

    try {
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password, salt)
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json('Account Already exist')
        }
        else {
            const newUser = new users({
                username,
                email,
                password: hashpassword
            })
            //save()-to store the data in mongodb
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        //client side error-401
        res.status(401).json(`registration failed due to ${error}`)
    }

}



//login
exports.loginController = async (req, res) => {
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            const isvalid = await bcrypt.compare(password, existingUser.password)
            if (isvalid) {
                //create tokens to handle loged in users and not logedin users.
                const token = jwt.sign({ userId: existingUser._id }, 'supersecretkey')
                //more data send only by array
                res.status(200).json({ existingUser, token })
            }else {
                res.status(406).json('Invalid password')
            }
        }
        else {
            res.status(406).json('Invalid emailId')
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

