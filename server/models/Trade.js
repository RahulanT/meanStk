const mongoose = require("mongoose");

const TradeSchema = mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  buyPrice: {
    type: Number,
    required: true
  },
  noStocks: {
    type: Number,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  exchange: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  time : {
    type: Date,
    require: true

  }
});

// export model user with UserSchema
module.exports = mongoose.model("Trade", TradeSchema);