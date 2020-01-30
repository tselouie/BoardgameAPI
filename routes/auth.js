const express = require("express");
const { signUp} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);
//router.post("/signin", signIn);

module.exports = router;
 