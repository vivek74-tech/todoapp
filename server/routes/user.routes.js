import express from "express"
import {register} from"../controller/user.controller.js"
import { login } from "../controller/user.controller.js";
import {logout} from "../controller/user.controller.js"
const router = express.Router();


router.route("/register").post(register)


router.route("/login").post(login)

router.route("/logout").post(logout)

router.get("/me", (req, res) => {
  console.log(req.cookies);
  console.log(req.cookies.token);

  res.json({
    cookies: req.cookies,
    token: req.cookies.token,
  });
});
export default router;
