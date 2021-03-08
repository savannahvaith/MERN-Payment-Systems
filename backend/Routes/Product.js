const router = require('express').Router();
const { Product } = require('../config/db');

// CREATE
router.post(`/create`, ({ body }, res, next) => {
    const prod = new Product(body);
    prod.save().then(result => {
        res.status(201).send(`${result.title} added successfully!`);
    }).catch(err => next(err));
});

// READ
router.get(`/getAll`, (req, res, next) => {
    Product.find((err, result) => {
        if (err) {
            next(err);
        }
        res.status(200).send(result);
    });
});

// READ ONE
router.get(`/get/:id`, (req, res, next) => {
    Product.findById(req.params.id, (err, result) => {
        if (err) {
            next(err);
        }
        res.status(200).send(result);
    });
});

// UPDATE
router.patch(`/update/:id`, (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, result) => {
        if (err) {
            next(err);
        }
        res.status(202).send(result);
    });
});

// DELETE
router.delete(`/delete/:id`, (req, res, next) => {
    Product.findByIdAndDelete(req.params.id, (err, result) => {
        if (err) {
            next(err);
        };
        res.status(204).send(result);
    });
});

// Save with prod
router.get(`/saveprod/:id`, (req, res, next) => {
    Product.findById(req.params.id).populate('prod') // key to populate
        .exec(function (err, prod) {
            if (err) console.log(err);
            else console.log(prod);
        })
});

router.get("/hello", (req, res, next) => {
    res.status(200).send("hello");
})

module.exports = router;