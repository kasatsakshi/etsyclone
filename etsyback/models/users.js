import mongoose from 'mongoose';

const userInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
  },
  phone: {
    type: String,
  },
  avatarUrl: {
    type: String,
  },
  birthday: {
    type: String,
  },
  bio: {
    type: String,
  },
  userStatus: {
    type: String,
    enum: ['active', 'inactive'],
  },
  lastLoginAt: {
    type: Date,
    default: Date.now,
  },
  lastLogoutAt: {
    type: Date,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  userLevel: {
    type: Number,
    enum: [0, 1, 2], // 0-buyer, 1-seller, 2-admin
    default: 0,
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

export default mongoose.model('user', userInfoSchema);
