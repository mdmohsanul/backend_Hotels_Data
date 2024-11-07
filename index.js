const { initializeDB } = require("./db/db.connect");
const express = require("express");
const Hotel = require("./models/hotel.model");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "*",
  credentials: true,
  openSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

initializeDB();

const allHotels = async () => {
  try {
    const hotels = await Hotel.find();
    return hotels;
  } catch (error) {
    throw error;
  }
};
app.get("/hotels", async (req, res) => {
  try {
    const hotels = await allHotels();
    if (hotels.length != 0) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotels not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// hotels by title
const getHotelByTitle = async (hotelName) => {
  try {
    const hotel = await Hotel.findOne({ name: hotelName });
    return hotel;
  } catch (error) {
    throw error;
  }
};
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotels = await getHotelByTitle(req.params.hotelName);

    if (hotels) {
      res.json(hotels);
    } else {
      res.status(404).json({ error: "Hotels not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
// --- update data ---
async function updateData(id, dataToUpdate) {
  try {
    const hotel = await Hotel.findByIdAndUpdate(id, dataToUpdate);
    return hotel;
  } catch (error) {
    throw error;
  }
}
app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedData = await updateData(req.params.hotelId, req.body);
    res
      .status(200)
      .json({ message: "Hotel updated successfully", updatedData });
  } catch (error) {
    res.status(500).json({ error: "failed to add data" });
  }
});
//---------- post data route
async function postData(data) {
  try {
    const hotel = new Hotel(data);
    const newHotel = await hotel.save();
    return newHotel;
  } catch (error) {
    throw error;
  }
}
app.post("/hotels", async (req, res) => {
  try {
    const updatedData = await postData(req.body);

    res.status(200).json({ message: "Hotel Added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to post new data" });
  }
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running");
});
