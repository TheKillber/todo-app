const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema({
   username: { type: String, required: true, trim: true, unique: true },
   password: { type: String, required: true, trim: true },
   posts: [{ type: Schema.Types.ObjectId, ref: "Post", required: true }],
});

userSchema.pre("save", async function (next) {
   const hash = await bcrypt.hash(this.password, saltRounds);
   this.password = hash;
   next();
});

const User = model("User", userSchema);

module.exports = User;
