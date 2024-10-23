const mongoose = require("mongoose");

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Hotel",
      "Resort",
      "Guesthouse",
      "Hostel",
      "Boutique Hotel",
      "Motel",
      "Bed & Breakfast",
    ],
    required: true,
    default: "Hotel",
  },
  location: String,
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  reviews: [{ type: String }],
  website: String,
  phoneNumber: String,
  checkInTime: String,
  checkOutTime: String,
  amenities: [{ type: String }],
  priceRange: {
    type: String,
    enum: ["$50 - $100", "$100 - $200", "$200 - $300", "$300+"],
    required: true,
  },
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
