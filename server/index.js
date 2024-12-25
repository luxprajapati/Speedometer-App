const express = require("express");
const app = express();
const dotenv = require("dotenv");
const { pool } = require("./config/database");
const {
  createTable,
  startGeneratingSpeedData,
} = require("./controllers/SpeedController");
const webSocket = require("ws");

dotenv.config();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up the WebSocket server
const wss = new webSocket.Server({ noServer: true });

const clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  console.log("New Client Connected");

  // Remove the client from the array when the connection is closed
  ws.on("close", () => {
    console.log("Client Disconnected");
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
    }
  });
});

// Function to send the speed data to all connected clients
const sendSpeedData = (data) => {
  clients.forEach((client) => {
    if (client.readyState === webSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

(async () => {
  try {
    pool.connect(async (err, client, release) => {
      if (err) {
        return console.error("Error while acquiring client", err.stack);
      } else {
        console.log("Connected to database");
      }
    });

    await createTable();

    startGeneratingSpeedData(sendSpeedData);
  } catch (err) {
    console.error("Error while connecting to database -- ", err);
    process.exit(1);
  }
})();

// Starting the server when the express server starts listening
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle WebSocket upgrade requests
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
  });
});

server.on("error", (err) => {
  console.error("Server error -- ", err);
});
