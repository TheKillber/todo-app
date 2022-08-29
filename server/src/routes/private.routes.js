const { Router } = require("express");
const {
   getAllPost,
   postAPost,
   deletePost,
   deleteAll,
} = require("../controllers/post.controller");
const userController = require("../controllers/user.controller");
const router = Router();

router.get("/", getAllPost);
router.post("/", postAPost);
router.delete("/:id", deletePost);
router.post("/deleteAll", deleteAll);

router.get("/user", userController.getUser);

module.exports = router;
