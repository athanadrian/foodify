import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    bio: { type: String },

    social: {
      facebook: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', ProfileSchema);
