const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please specify the user name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please specify the user email"],
    unique: true,
    trim: true,
    validate: [validator.isEmail, "Please provide a correct email"],
  },
  password: {
    type: String,
    required: [true, "Please specify the user password"],
    minlength: [8, "Password must be longer than 8 characters"],
    select: false,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin", "organization"],
  },
  achivements: {
    type: [String],
    enum: [
      "Eco Warrior",
      "Carbon Cutter",
      "Green Ambassador",
      "Sustainability Hero",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  lastPasswordChange: Date,
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
});

// --- DOCUMENT MIDDLEWARE ---

// If the password field is altered ( /signup, /change-password...), hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Update the "lastPasswordChange" field each time the password is changed
userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  // Since we are creating the token right after changing the password, we want to make sure that the token is issued BEFORE the password so we don't log the user out
  // In the "changedPasswordAfterTokenIssue", we are dividing the "lastPasswordChange" timestamp by 1000, and that might be creating some incorrections
  // We just say that the password was changed 10s ago from the time it was actually changed
  this.lastPasswordChange = Date.now() - 10000;
  next();
});

// --- METHODS ---

userSchema.methods.verifyPassword = async function (password, passwordHash) {
  return await bcrypt.compare(password, passwordHash);
};

userSchema.methods.changedPasswordAfterTokenIssue = function name(tokenIat) {
  if (this.lastPasswordChange) {
    // Since the "token iat" is expressed in seconds, we must convert the timestamp in miliseconds to seconds
    const passwordChangeTimestamp = Math.floor(
      this.lastPasswordChange.getTime() / 1000
    );
    // console.log("password change timestamp: ", passwordChangeTimestamp);
    // console.log("token issued at timestamp: ", tokenIat);
    return passwordChangeTimestamp > tokenIat;
  }
  //   console.log("Password never changed");
  return false;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
