const { Schema, model } = require("mongoose");

const postSchema = new Schema({
   content: {
      type: String,
      required: true,
   },
   date: Date,
});

module.exports = model("Post", postSchema);
