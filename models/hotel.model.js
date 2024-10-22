const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: String,
  location: String,
  rating: Number,
  reviews: [{ type: String }],
  website: String,
  phoneNumber: String,
  checkInTime: String,
  checkOutTime: String,
  amenities: [{ type: String }],
  priceRange: String,
  reservationsNeeded: Boolean,
  isParkingAvailable: Boolean,
  isWifiAvailable: Boolean,
  isPoolAvailable: Boolean,
  isSpaAvailable: Boolean,
  isRestaurantAvailable: Boolean,
  photos: [{ type: String }],
});
const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
