const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// signup method (static)
userSchema.statics.signup = async function(email, password) {
  // check if fields are filled
  if (!email || !password) throw Error('all fields required');

  // validate email & password
  if (!validator.isEmail(email)) throw Error('invalid email');
  if (!validator.isStrongPassword(password)) throw Error('weak password');

  // check if user exists
  const exists = await this.findOne({ email });
  if (exists) throw Error('email already in use');

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create user
  return await this.create({ email, password: hash });
};

// login method (static)
userSchema.statics.login = async function(email, password) {
  if (!email || !password) throw Error('all fields required');

  // check if user exists
  const user = await this.findOne({ email });
  if (!user) throw Error('incorrect email');

  // compare passwords
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw Error('incorrect password');

  return user;
};

module.exports = mongoose.model('User', userSchema);
