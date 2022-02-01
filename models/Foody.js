import mongoose from 'mongoose';

const FoodySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please provide title.'] },
    village: { type: String, required: [true, 'Please provide village.'] },
    remarks: { type: String },
    cuisine: {
      type: String,
      required: [true, 'Type of cuisine is required.'],
      enum: {
        values: ['greek', 'asian', 'italian', 'mexican'],
        message: 'Tour type is either greek, asian, italian,mexican',
      },
      default: 'greek',
    },
    location: {
      name: {
        type: String,
        default: 'pending',
        required: true,
      },
      //   latitude: { type: Number, required: true },
      //   longitude: { type: Number, required: true },
    },
    tour: {
      type: String,
      //required: [true, 'Type of Foody is required.'],
      enum: {
        values: ['pending', 'food', 'walk', 'adventure'],
        message: 'Tour type is either Food, Walk, Adventure',
      },
      default: 'pending',
    },
    foody: {
      type: String,
      required: [true, 'Type of food is required.'],
      enum: {
        values: ['pending', 'meze', 'ala-kart', 'buffet'],
        message: 'Foody type is either meze, ala-kart, buffet',
      },
      default: 'pending',
    },
    cost: {
      type: String,
      required: [true, 'Cost is required.'],
      enum: {
        values: ['pending', 'cheap', 'average', 'expensive'],
        message: 'Cost is either cheap, average, expensive',
      },
      default: 'pending',
    },
    status: {
      type: String,
      //required: [true, 'Status is required.'],
      enum: {
        values: ['published', 'unpublished'],
        message: 'Foody status is either viewed, visited, interested',
      },
      default: 'unpublished',
    },
    preference: {
      type: String,
      //required: [true, 'Status is required.'],
      enum: {
        values: ['pending', 'not-interested', 'visited', 'interested'],
        message:
          'Foody preference is either not-interested, visited, interested',
      },
      default: 'pending',
    },
    picUrl: { type: String },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    comments: [
      {
        _id: { type: String, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Foody', FoodySchema);
