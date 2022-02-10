const mongoose = require("mongoose");

const WatchListSchema = mongoose.Schema({

  company: {
    type: String,
    required: true
  },
  watchPrice: {
    type: Number,
    required: true
  },
  currPrice: {
    type: Number,
    required: true
  },
  ticker: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// export model user with UserSchema
module.exports = mongoose.model("WatchList", WatchListSchema);