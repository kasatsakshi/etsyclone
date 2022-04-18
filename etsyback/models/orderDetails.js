import mongoose from 'mongoose';

const orderDetailsSchema = new mongoose.Schema({
  orderQuantity: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['ordered', 'inTransit', 'delivered', 'cancelled'],
  },
  orderId: {
    type: Number,
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
  orderedDate: {
    type: Date,
  },
  userId: {
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
