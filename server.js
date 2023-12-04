const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Server } = require("socket.io");
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin:"*"
  }
});

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//database connection
const db = require("./db.config.js");
db.sequelize.sync()
  .then(() => {
    console.log("connected to db.");
  })
  .catch((err) => {
    console.log("Failed to connect to db: " + err.message);
  });


module.exports = io;

// simple route
require("./routes/User_Routes")(app);
require("./routes/Proj_Routes")(app);
require("./routes/Hyst_Routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});