const { Server } = require("socket.io");

const initializeWhiteboardRTC = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3001",
      methods: ["GET", "POST"],
    },
  });

  const whiteboardNamespace = io.of("/board");
  let whiteboardData = null; // Variable to store the current state of the whiteboard

  whiteboardNamespace.on("connection", (socket) => {
    console.log("New user connected");

    // Send the current state of the whiteboard to the new user
    if (whiteboardData !== null) {
      socket.emit("whiteboardData", whiteboardData);
    }

    // Handle the 'draw' event from clients
    socket.on("draw", (data) => {
      // Update the state of the whiteboard
      whiteboardData = data;

      // Broadcast the drawing data to all connected clients including the sender
      whiteboardNamespace.emit("draw", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = { initializeWhiteboardRTC }