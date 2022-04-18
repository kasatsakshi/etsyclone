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

export default mongoose.model('order', orderSchema);
