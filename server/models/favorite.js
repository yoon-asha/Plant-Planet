const mongoose = require('mongoose');

// Define Schemes
const favoriteSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    user_id: { type: String, required: true },
    post_id: { type: String, required: true },
  },
  { timestamps: true },
  { collection: 'favorite-collection' }
);

// Create Model & Export
module.exports = mongoose.model('Favorite', favoriteSchema);
