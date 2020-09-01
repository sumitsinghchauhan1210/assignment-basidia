"use strict";

var http = require('http');

var server = require('./src/framework_drivers/server/server');

var sequelize = require('./src/framework_drivers/database/sequelize');

var port = process.env.PORT || 4000;

var runServer = function runServer() {
  var myserver;
  return regeneratorRuntime.async(function runServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(sequelize.sync({
            alter: true
          }));

        case 3:
          console.log('Connected to the database successfully and syncing tables ...');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log('Could not connect to the database', _context.t0);

        case 9:
          try {
            // creating express server
            myserver = http.createServer(server);
            myserver.listen(port);
            console.log('Server running..... Port -', port);
          } catch (error) {
            console.log('failed to start the server');
          }

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

runServer();