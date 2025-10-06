const mongoose = require('mongoose')

const classSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainerName: { type: String }, // ✅ Add this field
  dateTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  maxMembers: { type: Number, default: 20 },
  description: { type: String, default: '' },
  bookedMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Class', classSchema);