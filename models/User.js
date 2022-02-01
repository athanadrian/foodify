import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minlength: [3, 'Name must be at least 3 characters'],
      maxlength: [20, 'Name must be at the most 20 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      validate: {
        validator: validator.isEmail,
        message: 'Please provide a valid email',
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide password '],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false,
    },
    role: {
      type: String,
      default: 'user',
      enum: ['user', 'root'],
      required: [true, 'User must have a role! '],
    },
    lastName: {
      type: String,
      trim: true,
      maxlength: [20, 'Lastname must be at the most 20 characters'],
      default: 'lastName',
    },
    location: {
      type: String,
      trim: true,
      maxlength: [20, 'Location must be at the most 20 characters'],
      default: 'my city',
    },
    profilePicUrl: { type: String },
  },
  { timestamps: true }
);

// Encrypt password using bcryptjs
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model('User', UserSchema);
