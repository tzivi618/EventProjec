const express = require('express')
const cors = require('cors');
const app = express()
const producersRouter = require('./routers/producer.router');
const eventRouter = require('./routers/event.router');
app.use(cors()); // מאפשר CORS לכל המקורות

app.listen(5000, () => {
    console.log('server is listening on port 5000')
})
app.use(express.json());
app.use('/producer', producersRouter);
app.use('/event', eventRouter);

