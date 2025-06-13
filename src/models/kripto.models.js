const mongoose = require('mongoose');

const kriptoSchema = new mongoose.Schema(
  {
    data: { type: [Number], required: true },
    scaled: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

kriptoSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = mongoose.model('Kripto', kriptoSchema);
