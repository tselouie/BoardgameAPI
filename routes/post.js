const express = require("express");

const { getPosts, createPost } = require("../controllers/post");
const { requireSignIn} = require("../controllers/auth");
const { createPostValidator } = require("../validator");
const { findUserById } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignIn, createPost, createPostValidator);

// check if user exist when any route uses :userId in para
router.param("userId", findUserById);

module.exports = router;
