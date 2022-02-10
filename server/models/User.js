const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({

  userlastName:{
    type: String,
    required: true
  },
  userfirstName : {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  trades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trade"
    }
  ]
});

// export model user with UserSchema
module.exports = mongoose.model("User", UserSchema);