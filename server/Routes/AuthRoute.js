const {Signup, Login} = require("../Controllers/AuthController");
const { userverification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
router.post("/Signup", Signup);
router.post("/Login",Login);
router.post("/", userverification);
module.exports=router;