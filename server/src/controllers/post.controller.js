const Post = require("../models/post.model");
const User = require("../models/user.model");

const getAllPost = async (req, res) => {
   try {
      const posts = await User.findById(req.user)
         .populate({ path: "posts" })
         .select("-password -_id");
      res.json(posts);
   } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
   }
};
const postAPost = async (req, res) => {
   const content = req.body.content;
   try {
      const newPost = await Post.create({
         content: content,
         date: new Date(),
      });

      await User.findByIdAndUpdate(req.user, {
         $push: {
            posts: newPost._id,
         },
      });

      res.json(newPost);
   } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
   }
};
const deletePost = async (req, res) => {
   await Post.findByIdAndDelete(req.params.id);
   await User.findByIdAndUpdate(req.user, {
      $pull: { posts: { $in: req.params.id } },
   });
   res.json(`Deleted post ${req.params.id}`);
};
const deleteAll = async (req, res) => {
   try {
      const { ids } = req.body;
      await Post.deleteMany({ _id: { $in: ids } });
      await User.findByIdAndUpdate(req.user, { $set: { posts: [] } });
      res.json("Clean");
   } catch (error) {
      res.status(error.status || 500).json(error);
   }
};
module.exports = { getAllPost, postAPost, deletePost, deleteAll };
