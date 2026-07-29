import jwt from "jsonwebtoken";
const isAuthenticated =async(req , res , next)=>{
   try {
    // console.log("request",req)
     console.log("Cookies:", req.cookies);
    const token = req.cookies.token;
     console.log("Token:", token);
    if(!token){
      return res.status(401).json({
        success:false,
        message:"User not authenticated"
      })
    };
    const decode = await jwt.verify(token,process.env.SECRET_KEY);

    console.log("decode",decode);
    if(!decode){
       return res.status(401).json({
        success:false,
        message:"Invalid token"
       })
    }
    req.id = decode.userId;
    next();
   } catch (error) {
    console.log(error)
   }
}

export default isAuthenticated;