const jwt = require("jsonwebtoken"); // maintain user status on web
require("dotenv").config();
const expressJwt = require("express-jwt");

const User = require("../models/user");

exports.signUp = async (req, res) => {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
        return res.status(403).json({
            error: "This email is taken"
        });
    }
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({ message: "Signup success! Please login." });
};

exports.signIn = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        // if err or no user
        if (err || !user) {
            return res.status(401).json({
                error: "User with that email does not exist. Please signin."
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in model and use here
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            });
        }
        // generate a token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie("t", token, { expire: new Date() + 9999 });
        // retrun response with user and token to frontend client
        const { _id, name, email } = user;
        return res.json({ token, user: { _id, email, name } });
    });
};


exports.signOut = (req, res) => {
    // clear token cookie
    res.clearCookie("t");
    return res.json({ message: "Signout success!" });
};

// make sure user is signed in with a token
exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
});
