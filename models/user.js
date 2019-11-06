const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const userSchema = Schema({
  title: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  picture: String,
  email: { type: String, required: true, unique: true },
  contact: { type: Number, required: true, unique: true },
  description: { type: String, required: true },
  address: String,
  password: { type: String, required: true, minlength: 6 },
  // TODO: Add post field and reference it to another schema by id
  post: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

// Create user instace
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
