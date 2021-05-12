const mongoose = require("mongoose");

const Offer = mongoose.model("Offer", {
  product_name: {
    type: String,
    maxLength: 50,
  },
  product_description: {
    type: String,
    maxLength: 500,
  },
  product_price: {
    type: Number,
    max: 100000,
  },
  product_details: Array,
  product_image: { type: mongoose.Schema.Types.Mixed, default: {} },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Offer;
