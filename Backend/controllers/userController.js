import jwt from "jsonwebtoken"
import validator from "validator"
import bcrypt from "bcrypt"
import userModel  from "../models/userModel.js"


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}


// user login 
const loginUser = async  (req, res)=>{
    try {
        const {email, password} =  req.body

        const user = await userModel.findOne({email})

        if(!user){
            return res.json({success:false, message:"user dosen't exists"})

        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token =  createToken(user._id)
            res.json({success:true,token})
        }

        else{
            res.json({success:false, message: 'Invalid credentials'})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}

// user register
const registerUser = async (req, res)=>{

    try {
        const {name, email, password} = req.body  
        // checking user allready exists or not 
        
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message:"user Allready exists"})

        }

        // validating email format or password strong 
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})

        }
            
        if (password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})

        }

        // hashing user password 

        const salt = await bcrypt.genSalt(10)

        const hashedPassword =  await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        
        res.json({success:true, token})

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}






// admin login 
const adminLogin = async (req, res)=>{
    try {
        
        const {name, password} = req.body

        if(name === process.env.ADMIN_NAME && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(name+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid name or password"})
        }

    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}





export {adminLogin, loginUser, registerUser}