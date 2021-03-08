'use strict';
const router = require('express').Router();
const stripe = require('stripe')(`${process.env.SECRET_KEY}`);

router.post("/stripe/charge", async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount: amount,
            currency: "GBP",
            payment_method: id,
            confirm: true,
        });
        res.json({
            payment: payment,
            message: "Payment Successful",
            success: true,
        });
    } catch (error) {
        res.json({
            message: "Payment Failed",
            success: false,
        });
    }
});

module.exports = router;