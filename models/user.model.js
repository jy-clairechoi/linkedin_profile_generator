const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema for user
const userSchema = new Schema({
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  profilePic: {
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: false,
    trim: true,
  },

  // major, minor, year, class
});

// client id,

// $callback = "http://localhost/callback.php";
// $scopes = "r_emailaddress r_basicprofile r_liteprofile";
// $ssl = false; //TRUE FOR PRODUCTION ENV.
// $linkedin = new LinkedIn($app_id, $app_secret, $callback, $scopes, $ssl);

const User = mongoose.model("User", userSchema);

module.exports = User;
