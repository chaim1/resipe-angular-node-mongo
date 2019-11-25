const mongoose = require("mongoose");

const errorSchema = mongoose.Schema({
  error:{type: Object}
});

module.exports = mongoose.model("error", errorSchema);
