const express = require("express");

const { getPosts, createPost } = require("../controllers/post");
const { requireSignIn} = require("../controllers/auth");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignIn, createPostValidator, createPost);

module.exports = router;
