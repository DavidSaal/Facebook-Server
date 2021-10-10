import User from "../models/user.js";
import Post from "../models/post.js";

const getUsers = (req, res) => {
  User.findAll({
    attributes: {
      exclude: ["password"],
      exclude: ["liked_posts"],
    },
  })
    .then((users) => {
      res.status(200).json({ message: "Ok", users: users });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(502).json({ message: "Error while getting users" });
    });
};

const likePost = (req, res) => {
  let userId = req.params.userId;
  let postId = req.params.postId;
  if (!userId) {
    return res.status(400).json({ message: "userId not provided" });
  } else if (!postId) {
    return res.status(400).json({ message: "postId not provided" });
  } else
    User.findOne({
      where: {
        userId: userId,
      },
    })
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "user not found" });
        } else {
          User.update(
            {
              liked_posts: dbUser.liked_posts
                ? dbUser.liked_posts + "," + postId
                : postId,
            },
            {
              where: {
                userId: userId,
              },
            }
          )
            .then(() => {
              Post.findOne({
                where: {
                  postId: postId,
                },
              }).then((post) => {
                Post.update(
                  {
                    likes_count: post.likes_count + 1,
                  },
                  {
                    where: {
                      postId: postId,
                    },
                  }
                )
                  .then(() => {
                    res.status(200).json({
                      message: "Liked successfully",
                    });
                  })
                  .catch((err) => {
                    console.log("error", err);
                    res
                      .status(502)
                      .json({ message: "Error while update post" });
                  });
              });
            })
            .catch((err) => {
              console.log("error", err);
              res.status(502).json({ message: "Error while update user" });
            });
        }
      })
      .catch((err) => {
        console.log("error", err);
        res.status(502).json({ message: "Error while getting user" });
      });
};

const unLikePost = (req, res) => {
  let userId = req.params.userId;
  let postId = req.params.postId;
  if (!userId) {
    return res.status(400).json({ message: "userId not provided" });
  } else if (!postId) {
    return res.status(400).json({ message: "postId not provided" });
  } else
    User.findOne({
      where: {
        userId: userId,
      },
    })
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "user not found" });
        } else {
          User.update(
            {
              liked_posts: dbUser.liked_posts
                .replace(postId, "")
                .replace(/,+/g, ",")
                .replace(/^,|,$/g, ""),
            },
            {
              where: {
                userId: userId,
              },
            }
          )
            .then(() => {
              Post.findOne({
                where: {
                  postId: postId,
                },
              }).then((post) => {
                Post.update(
                  {
                    likes_count: post.likes_count - 1,
                  },
                  {
                    where: {
                      postId: postId,
                    },
                  }
                )
                  .then(() => {
                    res.status(200).json({
                      message: "Successfully unLiked",
                    });
                  })
                  .catch((err) => {
                    console.log("error", err);
                    res
                      .status(502)
                      .json({ message: "Error while update post" });
                  });
              });
            })
            .catch((err) => {
              console.log("error", err);
              res.status(502).json({ message: "Error while update user" });
            });
        }
      })
      .catch((err) => {
        console.log("error", err);
        res.status(502).json({ message: "Error while getting user" });
      });
};

const getLikedPosts = (req, res) => {
  let userId = req.params.userId;
  if (!userId) {
    return res.status(400).json({ message: "userId not provided" });
  } else
    User.findOne({
      where: {
        userId: userId,
      },
    })
      .then((dbUser) => {
        if (!dbUser) {
          return res.status(404).json({ message: "user not found" });
        } else {
          res.status(200).json({
            liked_posts: dbUser.liked_posts,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
        res.status(502).json({ message: "Error while getting user" });
      });
};

export { getUsers, likePost, unLikePost, getLikedPosts };
