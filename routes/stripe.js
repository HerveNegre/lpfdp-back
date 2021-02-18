const express = require("express");
const router = express.Router();
const { createPaymentIntent } = require("../controllers/stripe");
const { route } = require("./user");

// middleware
const { authCheck } = require("../middlewares/auth");

//route
router.post("/create-payment-intent", authCheck, createPaymentIntent);

module.exports = router;
