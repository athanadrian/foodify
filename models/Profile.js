import mongoose from 'mongoose';

const ProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: 'User' },

    bio: { type: String },
    company: { type: String },
    website: { type: String },
    mobile: { type: String },
    social: {
      facebook: { type: String },
      messenger: { type: String },
      whatsApp: { type: String },
      viber: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      instagram: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model('Profile', ProfileSchema);
