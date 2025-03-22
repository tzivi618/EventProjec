const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/eventsTzivi', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

const { Schema, model } = mongoose;
const producerSchema = Schema({
    producerName: String,
    producerPhone: String,
    producerEmail: String,
    producerDescription: String
});



const ModuleProducer = model('producer', producerSchema);
module.exports = ModuleProducer;