'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
// const cookieParser = require('cookie-parser')
const port = process.env.PORT || 3000;
const path = require('path');

app.disable('x-powered-by')
app.use(bodyParser.json())
// app.use(cookieParser());

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

// CSRF protection - this makes it break!!!!!
// app.use((req, res, next) => {
//   if (/json/.test(req.get('Accept'))) {
//     return next();
//   }
//
//   res.sendStatus(406);
// });


const routes = require('./routes/routes')
app.use('/routes', routes)

// eslint-disable-next-line max-params
app.use((err, _req, res, _next) => {
  if (err.status && err.message) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  // eslint-disable-next-line no-console
  console.error("In app err handler, stack is " + err.stack);
  res.sendStatus(500);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found"   })
})

app.listen(port, () => {
  if (app.get('env') !== 'test') {
    // eslint-disable-next-line no-console
    console.log('Listening on port', port);
  }
});

module.exports = app
