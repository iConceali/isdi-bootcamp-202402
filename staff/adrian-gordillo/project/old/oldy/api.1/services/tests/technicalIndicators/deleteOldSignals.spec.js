// api/services/tests/technicalIndicators/deleteOldSignals.spec.js

import { expect } from "chai";
import sinon from "sinon";
import TechnicalOpportunity from "../../../models/TechnicalOpportunity.js";
import deleteOldSignals from "../../technicalIndicators/deleteOldSignals.js";
import { errors } from "com";

const { SystemError } = errors;

describe("deleteOldSignals", () => {
  let deleteManyStub;

  beforeEach(() => {
    deleteManyStub = sinon.stub(TechnicalOpportunity, "deleteMany");
  });

  afterEach(() => {
    deleteManyStub.restore();
  });

  it("succeeds on clearing old buy signals", async () => {
    deleteManyStub.resolves({ deletedCount: 10 });

    await deleteOldSignals();

    expect(deleteManyStub.calledOnce).to.be.true;
  });

  it("fails on error during clearing old buy signals", async () => {
    deleteManyStub.rejects(new Error("Database error"));

    try {
      await deleteOldSignals();
      throw new Error("Expected deleteOldSignals to throw an error");
    } catch (error) {
      expect(error).to.be.instanceOf(SystemError);
      expect(error.message).to.equal("Failed to clear old buy signals");
    }

    expect(deleteManyStub.calledOnce).to.be.true;
  });
});
