import express from "express"
import cors from "cors"
import connectTOMongo from "./src/DBconnection/db.js"


import User from "./src/modals/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
// import fetchuser from "../middleware/fetchUser.js";
import {body , validationResult} from "express-validator"
const JWT_SECERT = 'suhailisagoodboy'


const app = express()
connectTOMongo()
app.use(cors())
app.use(express.json())
app.post(
    "/api/createuser",
    [
      body("name", "please enter a valid name ").isLength({ min: 5 }),
      body("email", "please enter a valid email").isEmail(),
      body("password", "please enter a valid password ").isLength({ min: 5 }),
    ],
    async (req, res) => {
      console.log(req.body);
      let success = false;
      // If their are errors return a bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success,errors: errors.array() });
      }
  
  
      try{
  
      const salt =  await  bcrypt.genSalt(10)
      const secPass = await  bcrypt.hash(req.body.password,salt)
       // Chech wheather the with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        res
          .status(400)
          .json({
            success,
            errors: " Sorry a user with this email this email already exists  "
          });
      }
  // async  await method is used by using then method 
  
  
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
      })
  console.log(user)
      const data = {
        user : {
          id: user.id
        }
      }
      success = true
     const authToken = jwt.sign(data,JWT_SECERT)
     console.log(authToken)
      res.json({authToken, success})
  
    }   catch(error){
        console.error(error.message)
        res.status(500).send(" Some external error ocurred")
    }
    }
  );
  

app.listen(4000, () => {
    console.log("Server is running on port 4000")
})