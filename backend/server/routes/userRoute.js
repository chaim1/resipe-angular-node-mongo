const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const User = require("../models/userModel");
const UserFollow = require("../models/userFollow");
const errors = require("../models/errorsM");

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
    cb(error, "server/images-users/");
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

router.post("/register", (req, res, next) => {
  req.body.password.length < 5 ? res.status(203).json({ errors: 1 }) : ""; // error 1 errorsServer in languagesService

  User.find({ email: req.body.userEmail }).exec(function(err, email) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      if (email.length == 0) {
        User.find({ userName: req.body.userName }).exec(function(
          err,
          userName
        ) {
          if (err) {
            console.log(err);
            res.send(404, "Error has occurred!");
          } else {
            if (userName.length == 0) {
              bcrypt.hash(req.body.password, 10).then(hash => {
                const user = new User({
                  email: req.body.userEmail,
                  fullName: req.body.userFullName !== "" ? req.body.userFullName : null,
                  userName: req.body.userName,
                  password: hash,
                  req: req.toString()
                });
                user
                  .save()
                  .then(result => {
                    const userFollow = new UserFollow({
                      idUser: result._id,
                      fullName: req.body.userFullName !== "" ? req.body.userFullName : null,
                      userName: req.body.userName
                    });
                    userFollow.save();
                    const token = jwt.sign(
                      { email: result.email, userId: result._id },
                      "rTockrns-secreetCodeString-19892479724s;kdafsdafkasdkl543ldsf92742@#$$%$#$%$#$#@#(($*^#(#",
                      { expiresIn: "365d" }
                    );
                    User.findOneAndUpdate(
                      { _id: result._id },
                      { $set: { tokens: { token: token } } },
                      { new: true },
                      (err, result) => {
                        if (err) {
                          console.log(err);
                          res.status(500).json({
                            errors: 4,
                            message: "Invalid authentication credentials!1"
                          });
                        }
                        res.status(201).json({
                          message: "User created!",
                          result: {
                            uid: result._id,
                            fullName: result.fullName,
                            userName: result.userName,
                            token: result.tokens[0].token,
                            status: "ok"
                          }
                        });
                      }
                    );
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(500).json({
                      errors: 4,
                      message: "Invalid authentication credentials!2"
                    });
                  });
              });
            } else {
              res.status(203).json({ error: 3 });
            }
          }
        });
      } else {
        res.status(203).json({ error: 2 });
      }
    }
  });
});

router.post("/loginByEmail", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.userNameOrEmailLogin })
    .then(user => {
      if (!user) {
        return res.status(203).json({
          error: 5
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(203).json({
          error: 5
        });
      }
      res.status(200).json({
        Uid: fetchedUser._id,
        message: "ok",
        token: fetchedUser.tokens[0].token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({
        error: 4
      });
    });
});

router.post("/loginByUserName", (req, res, next) => {
  let fetchedUser;
  User.findOne({ userName: req.body.userNameOrEmailLogin })
    .then(user => {
      if (!user) {
        return res.status(203).json({
          error: 5
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(203).json({
          error: 5
        });
      }
      res.status(200).json({
        message: "ok",
        token: fetchedUser.tokens[0].token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(203).json({
        error: 4
      });
    });
});

// router.post("/loginBytoken", (req, res, next) => {
//   User.findOne({ "tokens.token": req.body.token })
//     .then(user => {
//       if (!user) {
//         return res.status(203).json({
//           message: "Auth failed"
//         });
//       } else if (user) {
//         return res.status(200).json({
//           useId: user._id,
//           name: user.fullName,
//           message: "good",
//           role: user.role
//         });
//       }
//     })
//     .catch(err => {
//       return res.status(203).json({
//         message: "Invalid authentication credentials!"
//       });
//     });
// });

router.get("/userEmail:email", function(req, res) {
  User.find({ email: req.params.email }).exec(function(err, email) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      if (email.length == 0) {
        res.status(201).json("ok");
      } else {
        res.status(203).json({ error: 2 });
      }
    }
  });
});

router.get("/userName:userName", function(req, res) {
  User.find({ userName: req.params.userName }).exec(function(err, userName) {
    if (err) {
      console.log(err);
      res.status(404, "Error has occurred!");
    } else {
      if (userName.length == 0) {
        res.status(201).json("ok");
      } else {
        res.status(203).json({ error: 3 });
      }
    }
  });
});

router.post(
  "/userAddImage",
  multer({ storage: storage }).single("image"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    updateImageUserFollow(
      req.body.userId,
      url + "/images-users/" + req.file.filename
    );
    User.findOneAndUpdate(
      { _id: req.body.userId },
      {
        $set: {
          imageUser: url + "/images-users/" + req.file.filename
        }
      },
      { new: true },
      (err, result) => {
        if (err) {
          console.log(err);
          // const error = new errors({
          //   error: err
          // });
          // error.save().then(
          res.status(500).json({
            err: err,
            error: 6
          });
          // );
        }
        res.status(201).json({
          status: "ok"
        });
      }
    );
  }
);
router.post("/usersFolwo:idUser", function(req, res) {
  UserFollow.find({
    idUser: { $ne: req.params.idUser },
    userFollow: { $ne: req.params.idUser }
  })
    .skip(req.body.skip)
    .limit(req.body.limit)
    .sort({ numUserFollow: -1 })
    .exec(function(err, users) {
      if (err) {
        console.log(err);
        res.status(404, "Error has occurred!");
      } else {
        // setTimeout(() => {
        res.status(201).json(users);
        // }, 2000);
      }
    });
});

router.post("/addUserFollow", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      $push: {
        followingId: req.body.followId
      }
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "following"
      });
    }
  );
});
router.post("/pullUserFollow", (req, res, next) => {
  User.findOneAndUpdate(
    { _id: req.body.userId },
    {
      $pull: {
        followingId: req.body.followId
      }
    },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "error"
        });
      }
      res.status(201).json({
        message: "following"
      });
    }
  );
});

function updateImageUserFollow(userId, urlImage) {
  UserFollow.findOneAndUpdate(
    { idUser: userId },
    {
      $set: {
        imageUser: urlImage
      }
    },
    { new: true },
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
}

router.get("/allFollowUser:userID", function(req, res) {
  User.find({ _id: req.params.userID }).exec(function(err, result) {
    if (err) {
      console.log(err);
      res.send(404, "Error has occurred!");
    } else {
      res.status(201).json(result[0].following);
    }
  });
});

router.post("/addUserFollowInUserFollow", (req, res, next) => {
  UserFollow.findOneAndUpdate(
    { idUser: req.body.followId },
    {
      $push: {
        userFollow: req.body.userId
      },
      $inc: { numUserFollow: 1 }
    },
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
    }
  );
});

router.post("/pullUserFollowInUserFollow", (req, res, next) => {
  UserFollow.findOneAndUpdate(
    { idUser: req.body.followId },
    {
      $pull: {
        userFollow: req.body.userId
      },
      $inc: { numUserFollow: -1 }
    },
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
    }
  );
});

module.exports = router;
