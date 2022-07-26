import mongoose from 'mongoose';
import slugify from 'slugify';

const FoodySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Please provide title.'] },
    village: { type: String, required: [true, 'Please provide village.'] },
    phone: { type: String },
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
      lat: { type: Number },
      lng: { type: Number },
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
    menu: {
      type: String,
      required: [true, 'Type of menu is required.'],
      enum: {
        values: ['meze', 'alaCarte', 'buffet'],
        message: 'Menu type is either meze, a la carte, buffet',
      },
      default: 'a la carte',
    },
    type: {
      type: String,
      required: [true, 'Type is required.'],
      enum: {
        values: ['breakfast', 'brunch', 'lunch', 'dinner', 'drink'],
        message: 'Foody type is either breakfast, brunch, lunch, dinner, drink',
      },
      default: 'lunch',
    },
    cost: {
      type: String,
      required: [true, 'Cost is required.'],
      enum: {
        values: ['cheap', 'average', 'expensive'],
        message: 'Cost is either cheap, average, expensive',
      },
      default: 'average',
    },
    status: {
      type: String,
      required: [true, 'Status is required.'],
      enum: {
        values: ['published', 'unpublished'],
        message: 'Foody status is either viewed, visited, interested',
      },
      default: 'unpublished',
    },
    slug: String,
    picUrl: { type: String },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
    likes: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ],
    visits: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
      },
    ],
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

FoodySchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

export default mongoose.model('Foody', FoodySchema);
