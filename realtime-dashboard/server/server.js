const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const http = require("http"); 
const {Server} =require("socket.io")


dotenv.config();

const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

mongoose
  .connect(process.env.URI)
  .then(() => {
    console.log("Database Connected");
      const server = http.createServer(app); // Create an HTTP server
      const io = new Server(server, {
        cors: {
          origin: "http://localhost:3000",
        },
      });
  

    io.on("connection", (socket) => {
      // You can listen to events and emit them here, e.g., sending updated user data
      socket.on("userCreated", (data) => {
        io.emit("userUpdated", data); // Emit the event to all connected clients
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected");
      });
    });

    server.listen(process.env.PORT || 8000, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Server running at PORT: ", process.env.PORT);
      }
    });
  })
  .catch((error) => {
    console.log("error", error);
  });

app.use("/user", userRoute);
