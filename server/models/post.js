const mongoose = require('mongoose');

// Define Schemes
const postSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    userID: { type: String, required: true },
    userName: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String },
    address: { type: String, required: true },
    url: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true },
  { collection: 'post-collection' }
);

// Create Model & Export
module.exports = mongoose.model('Post', postSchema);
