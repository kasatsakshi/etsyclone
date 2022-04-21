import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
  orderQuantity: {
    type: Number,
    required: true,
  },
  orderId: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  pictureUrl: {
    type: String,
  },
  cateogry: {
    type: String,
  },
  price: {
    type: Number,
  },
  shopId: {
    type: String,
  },
  inventoryId: {
    type: String,
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

export default mongoose.model('orderDetails', orderDetailsSchema);
