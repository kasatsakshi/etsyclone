import mongoose from 'mongoose';

const userFavoritesSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  inventoryId: {
    type: String,
    required: true,
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

export default mongoose.model('userFavorites', userFavoritesSchema);
