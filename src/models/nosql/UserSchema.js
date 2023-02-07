const mongoose = require('mongoose')
const {Schema} = require('mongoose')
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
   id: {
      type: mongoose.Types.ObjectId
   },
   names: {
      type: String
   },
   lastName: {
      type: String
   },
   email: {
      type: String,
      unique: true
   },
   password: {
      type: String
   },
   purchased: [{
      id: {
         type: String
      },
      count: {
         type: Number
      },
      cost: {
         type: Number
      }
   }],
   country: {
      type: String
   },
   state: {
      type: String
   },
   city: {
      type: String
   },
   postalCode: {
      type: String
   },
   address: {
      type: String
   },
   softDeleted: {
      type: Boolean,
      default: false
   },
   createdAt: {
      type: Date,
      default: Date.now
   }
} , {
   timestamps: false,
   versionKey: false
})

const saltRound = 10;
UserSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("password")) {
    const document = this;
    bcrypt.hash(document.password, saltRound, (err, hashedPassword) => {
      if (err) {
        next(err);
      } else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
      }
});

UserSchema.methods.isCorrectPassword = function (password, callback) {
  bcrypt.compare(password, this.password, function (err, res) {
    if (err) {
      callback(err);
    } else {
      callback(err, res);
    }
  });
};


module.exports = mongoose.model("User", UserSchema)