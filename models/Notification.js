import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  toUser: { type: Schema.Types.ObjectId, ref: 'User' },

  notifications: [
    {
      type: {
        type: String,
        enum: ['newLike', 'newComment', 'newVisit', 'newFollower'],
      },
      fromUser: { type: Schema.Types.ObjectId, ref: 'User' },
      foody: { type: Schema.Types.ObjectId, ref: 'Foody' },
      commentId: { type: String },
      text: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
});

export default mongoose.model('Notification', NotificationSchema);
