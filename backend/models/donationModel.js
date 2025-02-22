const mongoose = require("mongoose");

const donationSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      // required: [true, "A donation must belong to an User"],
    },
    name: {
      type: String,
      required: [true, "A donation must have a name"],
    },
    email: {
      type: String,
    },
    amount: {
      type: Number,
      required: [true, "A donation must have an amount"],
      min: [1, "A donation can not have a smaller amount than 1"],
    },
    purpose: {
      type: String,
      required: [true, "A donation must have a purpose"],
      enum: ["tree", "sea", "river", "renewable-energy", "city"],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

donationSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name email",
  });

  next();
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
