const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const getFlights = require("./routeFunctions/getFlights");
const reserveFlight = require("./routeFunctions/reserveFlight");
const getReservations = require("./routeFunctions/getReservations");
const getCurrentFlightlist = require("./routeFunctions/getCurrentFlightlist");

const app = express();
const FRONTEND_URL = process.env.FRONTEND_URL;

const FLIGHTS_API =
  "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices";
const FLIGHT_LIST_ARRAY_ID = "6494152cea24aa99db7c1e89";

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      FRONTEND_URL,
      "https://accounts.google.com",
    ],
    credentials: true,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// ROUTES
app.get("/", (req, res) => {
  res.send("Cosmos Odyssey Homepage");
});
app.get("/api/currentpricelist", (req, res) => {
  // To get pricelist quicker because from
  getCurrentFlightlist(res, FLIGHTS_API); // database it takes too much time to load
});
app.get("/api/pricelist", (req, res) => {
  getFlights(res, FLIGHTS_API, FLIGHT_LIST_ARRAY_ID);
});
app.post("/api/reservation", (req, res) => {
  reserveFlight(req, res);
});
app.get("/api/reservations", (req, res) => {
  getReservations(res);
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
