const mongoose = require("mongoose");

const userFollowSchema = mongoose.Schema({
  idUser:{type: String, required:true},
  fullName: {},
  userName: { type: String, required: true, unique: true},
  imageUser: { type: String },
  userFollow:[String],
  numUserFollow:{type:Number,default:0}
});

module.exports = mongoose.model("UserFollow", userFollowSchema);
