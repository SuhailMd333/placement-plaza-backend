import jwt from "jsonwebtoken";
const JWT_SECERT = 'suhailisagoodboy';
const fetchuser = (req,res,next) => {

    // // Get the user from jwt token and add id to req object 

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Please authenticate using a valid Token '})
    }


    try{

    
    const data = jwt.verify(token,JWT_SECERT);
    req.user = data.user;

    next();

} catch (error) {

}
// res.status(401).send({error:'Please authenticate using a valid Token '})
     

}

export default fetchuser