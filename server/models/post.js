const mongoose = require('mongoose');

// Define Schemes
const postSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    user_id: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    desc: { type: String },
  },
  { timestamps: true },
  { collection: 'post-collection' }
);

// Create Model & Export
module.exports = mongoose.model('Post', postSchema);
