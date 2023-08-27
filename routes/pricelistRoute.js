const express = require("express");
const getFlights = require("../routeFunctions/getFlights");
const router = express.Router();

const FLIGHTS_API =
  "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices";
const FLIGHT_LIST_ARRAY_ID = "6494152cea24aa99db7c1e89";

router.get("/pricelist", (req, res) => {
  getFlights(res, FLIGHTS_API, FLIGHT_LIST_ARRAY_ID);
});
