const express = require("express");
const multer = require("multer");

const Post = require("../models/postModel");
const User = require("../models/userModel");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "server/images-posts/");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

const router = express.Router();

router.post(
  "/createPost",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    console.log(req.body);
    const url = req.protocol + "://" + req.get("host");
    const post = new Post({
      userId: req.body.userId,
      title: req.body.title,
      imagePost: url + "/images-posts/" + req.file.filename,
      Instructions: req.body.Instructions,
      direction:/([A-Za-z])\w+/g.test(req.body.Instructions)?true:false
    });
    post.save().then(result => {
      getNameAndImageUserCreate(result.userId);
      console.log(result);
      res.status(201).json({
        postId: result._id,
        message: "post create"
      });
    });
  }
);
router.post("/insertIngredient:idPost", (req, res, next) => {
  Post.findOneAndUpdate(
    { _id: req.params.idPost },
    { $push: { ingredients: req.body.ingedient } }
  ,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "ok"
      });
    });
});


router.post("/likePost:idPost", (req, res, next) => {

  Post.findOneAndUpdate(
    { _id: req.params.idPost },
    { $push: { likesId: req.body.idUser } }
  ,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "ok"
      });
    });
});


router.post("/dontLikePost:idPost", (req, res, next) => {

  Post.findOneAndUpdate(
    { _id: req.params.idPost },
    { $pull: { likesId: req.body.idUser } }
  ,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "ok"
      });
    });
});

router.get("/allPostsFollowUser:userID", function(req, res) {
  Post.find().exec(function(err, result) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      res.status(201).json(result);
    }
  });
});

function getNameAndImageUserCreate(userId) {
  User.findOne({ _id: userId }).then(user => {
    if (!user) {
      return res.status(500).json({
        error: 5
      });
    }
    Post.findOneAndUpdate(
      { userId: userId },
      {
        $set: {
          fullName: user.fullName,
          userName: user.userName,
          userImage: user.imageUser
        }
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
        }
        // console.log(result);
      }
    );
  });
}

module.exports = router;
