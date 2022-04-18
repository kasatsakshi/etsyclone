import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  userId: {
    type: String,
  },
  address: {
    type: Object,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('shop', shopSchema);
