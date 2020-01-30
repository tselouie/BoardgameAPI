const express = require("express");
const { signUp, signIn, signOut} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

const router = express.Router();

router.post("/signup", userSignupValidator, signUp);
router.post("/signin", signIn);
router.get("/signout", signOut);

module.exports = router;
 