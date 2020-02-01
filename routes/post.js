const express = require("express");

const { getPosts, createPost, postsByUser } = require("../controllers/post");
const { requireSignIn} = require("../controllers/auth");
const { createPostValidator } = require("../validator");
const { findUserById } = require("../controllers/user");

const router = express.Router();

router.get("/", getPosts);
router.post("/post/new/:userId", requireSignIn, createPost, createPostValidator);
router.get("/posts/by/:userId", requireSignIn, postsByUser);

// check if user exist when any route uses :userId in para
router.param("userId", findUserById);

module.exports = router;
