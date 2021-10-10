import express from "express";

import { signup, login, forgotPassword, isAuth } from "../controllers/auth.js";
import { getPosts, addNewPost } from "../controllers/posts.js";
import {
  getUsers,
  likePost,
  unLikePost,
  getLikedPosts,
} from "../controllers/users.js";

const router = express.Router();

router.post("/", addNewPost);

router.post("/users/:userId/posts/:postId/like", likePost);

router.post("/users/:userId/posts/:postId/unlike", unLikePost);

router.get("/users/:userId/posts/likes", getLikedPosts);

router.get("/users/:userId/posts", getPosts);

router.get("/users", getUsers);

router.post("/resetPassword", forgotPassword);

router.post("/login", login);

router.post("/signup", signup);

router.get("/private", isAuth);

router.get("/public", (req, res, next) => {
  res.status(200).json({ message: "here is your public resource" });
});

router.use("/", (req, res, next) => {
  res.status(404).json({ error: "page not found" });
});

export default router;
