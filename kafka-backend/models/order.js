import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  finalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['ordered', 'inTransit', 'delivered', 'cancelled'],
  },
  orderId: {
    type: String,
    required: true,
  },
  orderedDate: {
    type: Date,
    required: true,
  },
  userId: {
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

export default mongoose.model('order', orderSchema);
