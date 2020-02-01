const formidable = require("formidable"); // handle files
const fs = require("fs"); // file system

const Post = require("../models/post");

exports.getPosts = (req, res) => {
    const posts = Post.find()
        .populate("postedBy", "_id name") // get postedBy user info
        .select("_id title body")
        .then(posts => {
            res.json({ posts });
        })
        .catch(err => console.log(err));
};

exports.createPost = (req, res) => {
    // get incoming form fields
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    // get the req and parse the fields
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Image could not be uploaded"
            });
        }
        let post = new Post(fields);

        // should not show password on front end
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;

        if (files.image) {
            // read file path and type
            post.image.data = fs.readFileSync(files.image.path);
            // them save the type into image
            post.image.contentType = files.image.type;
        }
        post.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(result);
        });
    });
};

/* find post based on posted by user */
exports.postsByUser = (req, res) => {
    Post.find({ postedBy: req.profile._id })
        .populate("postedBy", "_id name") 
        .sort("_created")
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json(posts);
        });
};