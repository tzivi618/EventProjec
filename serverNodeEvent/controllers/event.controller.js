const express = require('express');
const app = express();
app.use(express.json());
const ModuleEvent = require('../modules/event.module');


const getEvent = async (req, res) => {
    try {
        const eventFind = await ModuleEvent.findOne({eventName: req.params.eventName })
        res.status(200).send('data:' + eventFind);
    } catch (error) {
        res.status(400);
    }

}
const getEvents = async (req, res) => {
    try {
        const eventsFind = await ModuleEvent.find();
        res.status(200).send('data: ' + eventsFind);
    } catch (error) {
        res.status(400);
    }

}
const createEvent = async (req, res) => {
    try {
        const newEvent = getEventFromBody(req);
        if(!newEvent.eventName||!newEvent.producerId)
        return res.status(400).send('producerId and name are require')
        console.log(req.body.producerName);
        const event = new ModuleEvent(newEvent);
        await event.save();
        console.log('Producer added successfully:', event);
        res.status(200).send(newEvent);
    } catch (error) { 
        console.error('Error adding producer:', error);
        res.status(400).send(error);
    }
};
const updateEvent = async (req, res) => {
    try {
        const newEvent = getProducerFromBody(req);
        const event = await ModuleEvent.findOneAndUpdate({ eventName: newEvent.eventName }, newEvent, { new: true });
        res.status(200).send(event);
    }
    catch (error) {
        res.status(400).send(error);
        console.error('Error adding producer:', error);
    }
};
const deleteEvent = async (req, res) => {
    try {
        newEvent = getEventFromBody(req);
        const event = await ModuleEvent.deleteOne({ eventName: newEvent.eventName });
        res.status(200).send(event);
    }
    catch (error) {
        console.log()
        res.status(400).send(error);
        console.error('Error adding producer:', error);
    }
};

const getEventFromBody = (req) => {
    const { eventId ,eventName, eventDescription,producerId} = req.body;
    return newProducer = {
        eventId: eventId,
        eventName: eventName,
        eventDescription:eventDescription ,
        producerId :producerId,
 
    }
}; 

module.exports = {
    createEvent,
    getEvent,
    getEvents,
    updateEvent,
    deleteEvent
} ;