import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
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
    home: {
      type: String,
      trim: true,
      maxlength: [20, 'Home must be at the most 20 characters'],
      default: 'my home',
    },
    location: {
      lat: { type: Number, default: 0 },
      lng: { type: Number, default: 0 },
    },
    unreadNotification: { type: Boolean, default: false },
    resetPasswordAttempts: [{ success: Boolean, date: Date }],
    profilePicUrl: { type: String },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
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

// Generate and hash password token for resetting password
UserSchema.methods.getResetPasswordToken = async function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model('User', UserSchema);
