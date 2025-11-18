const router = require('express').Router();
const Request = require('../models/Request');
const auth = require("../middleware/auth");


router.post('/', auth,async (req, res) => {
    const request = await Request.create(req.body);
    res.json(request);
});

router.get('/', async (req, res) => {
    const requests = await Request.find().populate('studentId proId');
    res.json(requests);
});

router.patch('/:id',auth, async (req, res) => {
    const updated = await Request.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(updated);
});

module.exports = router;
