import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
export const register = async (req, res) => {
  try {
    // console.log(req.body)
    const { fullname, email, password } = req.body
    if (!fullname || !email || !password) {
      return (
        res.status(403).json({
          success: false,
          message: "All fields are required"
        })
      )
    }
    // find karenn ge ki es email id se user to registor nahi hai

    const user = await User.findOne({ email });
    if (user) {
      return (
        res.status(402).json({
          success: false,
          message: "This email id already register"
        })
      )
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({
      fullname,
      email,
      password: hashedPassword
    });




    return res.status(201).json({
      success: true,
      message: "This email id  registered"
    })
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body
    if (!email || !password) {
      return (
        res.status(403).json({
          success: false,
          message: "All fields are required"
        })
      )
    }

    const user = await User.findOne({ email })

    console.log("user",user);
    if (!user) {
      return (
        res.status(403).json({
          success: false,
          message: "Incorrect email and password"
        })
      )
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return (
        res.status(403).json({
          success: false,
          message: "Incorrect email and password"
        })
      )
    }
    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return res.cookie("token", token, {
  httpOnly: true,
  sameSite: "strict",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
}).json({
      success: true,
      message: `Welcome back ${user.fullname}`

    })
  } catch (error) {
    console.log(error)
  }

}
export const logout = async (req, res) => {
  return res
    .clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    })
    .status(200)
    .json({
      success: true,
      message: "Logout successful",
    });
};