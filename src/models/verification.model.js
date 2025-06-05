const mongoose = require('mongoose');

const verificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    uniqueString: { type: String, required: true },
    expiredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

verificationSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  return { id: _id, ...object };
});

module.exports = mongoose.model('Verification', verificationSchema);
