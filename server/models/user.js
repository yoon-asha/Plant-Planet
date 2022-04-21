const mongoose = require('mongoose');

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String },
    // post_created 시간은 계정 만드는 시간이랑 다름 Check 필요
    // post_created_at: { type: timestamp },
  },
  { timestamps: true },
  { collection: 'user-collection' }
);

// Create Model & Export
module.exports = mongoose.model('User', userSchema);
