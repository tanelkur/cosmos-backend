const axios = require("axios");

const getCurrentFlightlist = async (res, FLIGHTS_API) => {
  try {
    const response = await axios.get(FLIGHTS_API);
    const { id, validUntil, legs } = response.data;
    const flights = { id, validUntil, legs };

    res.status(200).send(flights);
  } catch (error) {
    console.log("Backend axios");
    console.log(error.message);
  }
};

module.exports = getCurrentFlightlist;
