import mongoose from 'mongoose';

const FollowSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User' },

  followers: [
    {
      user: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
  ],

  following: [
    {
      user: { type: mongoose.Types.ObjectId, ref: 'User' },
    },
  ],
});

export default mongoose.model('Follow', FollowSchema);
