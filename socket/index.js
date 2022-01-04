const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//because socket id changes on refresh I need to create users id array
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

console.log("users socket: ", users);
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //to connect
  console.log("a user connected.");
  //take userId and socketId from client
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    //send everyone
    io.emit("getUsers", users);
  });

  //to send and get messages
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    console.log("socket User: ", user);
    user &&
      io.to(user.socketId).emit("getMessage", {
        senderId,
        text,
      });
  });

  //disconnection function
  socket.on("disconnect", () => {
    console.log("a user disconnected");
    //remove the disconnected user
    removeUser(socket.id);
    //send everyone
    io.emit("getUsers", users);
  });
});
