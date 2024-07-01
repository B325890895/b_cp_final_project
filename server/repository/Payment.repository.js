const { query } = require("express");
const Repository = require("./Repository");
const { default: mongoose } = require("mongoose");
const connection = process.env.CONNECTION_URL;
const paymentModel = require("./models/Payment.model");
class PaymentRepository extends Repository {
  constructor(connection, model) {
    super(connection, model);
  }
}

module.exports = new PaymentRepository(connection, paymentModel);
