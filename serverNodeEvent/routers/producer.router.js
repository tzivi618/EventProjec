const express = require('express');
const router = express.Router();

const {
    createProducer,
    getProducer,
    getProducers,
    updateProducer
} = require('../controllers/producer.controller');

router.get('/', getProducers);
router.get('/:producerEmail', getProducer); 
router.post('/', createProducer); 
router.put('/:producerEmail', updateProducer); 
module.exports = router;
