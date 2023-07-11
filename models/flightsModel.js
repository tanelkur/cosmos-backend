const mongoose = require("mongoose");

const flightsSchema = mongoose.Schema(
  {
    id: {
      type: String,
    },
    validUntil: {
      type: String,
    },
    legs: {
      type: Array,
    },
    reservations: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

const Flights = mongoose.model("Flights", flightsSchema);

module.exports = Flights;
