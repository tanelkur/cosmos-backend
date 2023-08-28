const axios = require("axios");

const getCurrentFlightlist = async (res, FLIGHTS_API) => {
  try {
    const response = await axios.get(FLIGHTS_API);
    const { id, validUntil, legs } = response.data;

    res.status(200).send({ id, validUntil, legs });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getCurrentFlightlist;
