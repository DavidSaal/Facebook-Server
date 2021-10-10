import Post from "../models/post.js";
import User from "../models/user.js";

const getPosts = (req, res) => {
  let userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "User id not provided" });
  } else {
    Post.findAll({
      where: {
        userId: userId,
      },
    })
      .then((posts) => {
        if (posts) res.status(200).json({ message: "Ok", posts: posts });
        else res.status(200).json({ message: "You have no posts" });
      })
      .catch((err) => {
        console.log("error", err);
        res.status(502).json({ message: "Error while getting posts" });
      });
  }
};

const addNewPost = (req, res) => {
  let header = req.body.post.header;
  let description = req.body.post.description;
  let userId = req.body.userId;
  if (!userId) {
    return res.status(400).json({ message: "userId not provided" });
  } else if (!header) {
    return res.status(400).json({ message: "Header not provided" });
  } else if (!description) {
    return res.status(400).json({ message: "Description not provided" });
  } else {
    User.findOne({
      where: {
        userId: userId,
      },
    }).then((dbUser) => {
      if (dbUser) {
        return Post.create({
          userId: userId,
          header: header,
          description: description,
          likes_count: 0,
        })
          .then((newPost) => {
            res.status(200).json({ message: "Post created", newPost: newPost });
          })
          .catch((err) => {
            console.log("error", err);
            res.status(502).json({ message: "Error while creating post" });
          });
      } else {
        return res.status(409).json({ message: "User not found" });
      }
    });
  }
};

export { getPosts, addNewPost };
