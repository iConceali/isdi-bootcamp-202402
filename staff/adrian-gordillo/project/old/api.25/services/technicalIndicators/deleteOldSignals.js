// api/services/technicalIndicators/deleteOldSignals.js

import TechnicalOpportunity from "../../models/TechnicalOpportunityModel.js";
import { errors } from "com";

const { SystemError } = errors;

/**
 * Delete old technical opportunities from the database
 */
const deleteOldSignals = async () => {
  try {
    await TechnicalOpportunity.deleteMany({});
    console.log("Cleared old buy signals.");
  } catch (error) {
    console.error("Error clearing old buy signals: ", error.message);
    throw new SystemError("Failed to clear old buy signals");
  }
};

export default deleteOldSignals;
