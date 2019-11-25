const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userImage: {type: String},
  userName:{type: String},
  fullName: {type: String},
  title: { type: String, required: true },
  imagePost: { type: String },
  date: { type: Date, default: new Date() },
  ingredients: [String],
  Instructions: { type: String },
  direction: { type: Boolean},
  likeCount: { type: Number, default: 0 },
  CommentsCount:{type: Number, default: 0},
  likesId:[],
  Comments: [{
    Comment: {
      type: String
    },
    idComent: {
      type: String
    }
  }]
});

module.exports = mongoose.model("Post", postSchema);
