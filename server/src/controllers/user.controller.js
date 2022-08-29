const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
   create: async (req, res, next) => {
      const { password, username } = req.body;
      try {
         await User.create({ password, username });

         res.json({
            status: "Success",
            message: "User succesfully created",
            data: null,
         });
      } catch (error) {
         res.status(error.status || 401).json("This username is already taken");
      }
   },
   authenticate: async (req, res, next) => {
      const { password, username } = req.body;
      try {
         const user = await User.findOne({ username });
         if (!user)
            res.status(404).json("User not found, did you mean register?");
         const comparePass = await bcrypt.compare(password, user.password);
         if (!comparePass) {
            res.status(401).json("Wrong credentials!");
         }

         const token = jwt.sign({ id: user._id }, process.env.SESSION_SECRET, {
            expiresIn: "30h",
         });

         res.json({ status: "Success", token, user: user.username });
      } catch (error) {
         return error;
      }
   },
   getUser: async (req, res, next) => {
      try {
         const user = await User.findById(req.user).select("-password");

         res.json(user);
      } catch (error) {
         res.status(error.status || 500).json(error.message);
      }
   },
};
