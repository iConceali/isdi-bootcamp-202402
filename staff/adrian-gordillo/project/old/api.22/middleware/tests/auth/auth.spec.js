import { expect } from "chai";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import authenticate from "../../auth.js";

dotenv.config();

describe("Auth Middleware", () => {
  it("should populate req.user if the token is valid", (done) => {
    const user = { id: "123" };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "1h" });

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    const res = {};
    const next = () => {
      try {
        expect(req.user).to.have.property("id", "123"); // Solo verifica el ID
        done();
      } catch (error) {
        done(error);
      }
    };

    authenticate(req, res, next);
  });

  it("should return an error if no token is provided", (done) => {
    const req = { headers: {} };
    const res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      send: function (data) {
        try {
          expect(this.statusCode).to.equal(401);
          expect(data).to.deep.equal({ message: "No token provided" });
          done();
        } catch (error) {
          done(error);
        }
      },
    };
    const next = () => {};

    authenticate(req, res, next);
  });

  it("should return an error if the token is invalid", (done) => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken",
      },
    };
    const res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      send: function (data) {
        try {
          expect(this.statusCode).to.equal(403);
          expect(data).to.deep.equal({ message: "Invalid token" });
          done();
        } catch (error) {
          done(error);
        }
      },
    };
    const next = () => {};

    authenticate(req, res, next);
  });
});
