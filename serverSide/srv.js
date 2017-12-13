const http = require('http');
const express = require('express');

const app = express();

const notif = require('./schedule-server')
notif.setupNotification()

http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
