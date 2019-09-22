let express = require('express')
let app = express();

let http = require('http');
let server = http.Server(app);

let socketIO = require('socket.io');
let io = socketIO(server);

const port = process.env.PORT || 3000;

const games = {};
console.log('server running');

io.on("connection", (socket) => {
  console.log('user connected');

  socket.on('new-connection', (message) => {
    console.log(message);
    const gameId = message.id;
    // games[gameId] = gameId;
    io.emit('new-connection-'+gameId, message);
  });

  socket.on('new-message', (message) => {
    console.log(message);
    const gameId = message.id;
    io.emit('new-message-'+gameId, message);
  });

  /*let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    console.log(' get doc');
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
      console.log('add doc');
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
      console.log('edit doc');
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  io.emit("documents", Object.keys(documents));*/
});

server.listen(port, () => {
  console.log(`started on port: ${port}`);
});