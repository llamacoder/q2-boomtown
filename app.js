'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const port = process.env.PORT || 8000;
const path = require('path');
const cors = require('cors');

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors())

switch (app.get('env')) {
  case 'development':
    app.use(morgan('dev'));
    break;

  case 'production':
    app.use(morgan('short'));
    break;

  default:
}

app.use(express.static(path.join('public')));


const server = require('./serverSide/server')
app.get('/workshops', server.getAllWorkshops)
app.get('/mentors', server.getAllMentors)
app.get('/messages', server.getAllMessages)
app.get('/workshop/:id', server.getOneWorkshop)
app.post('/workshops', server.createWorkshop)
app.put('/workshop/:id', server.updateOneWorkshop)
app.delete('/workshop/:id', server.deleteOneWorkshop)
app.post('/sms', server.handleResponse)

app.use((err, _req, res, _next) => {
  if (err.status && err.message) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error("In app err handler, stack is " + err.stack);
  res.sendStatus(500);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found"   })
})

const listeningOnPort = app.listen(port, () => {
  if (app.get('env') !== 'test') {
    console.log('Listening on port', port);
  }
});

module.exports = { app, listeningOnPort }
