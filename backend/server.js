/* eslint-disable no-console */

// express setup
const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParserErrorHandler = require('express-body-parser-error-handler');

const app = express();

// mongodb and mongoose setup
const mongoose = require('mongoose');

const mongodbUsername = 'penn-marketplace';
const mongodbPassword = 'hL7OprFhSxfJ6Sst';
const mongodbDatabaseName = 'Penn-Marketplace';

const port = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGODB_URI
|| `mongodb+srv://${mongodbUsername}:${mongodbPassword}@penn-marketplace.6si5d.mongodb.net/${mongodbDatabaseName}?retryWrites=true&w=majority`;

// mongodb connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const http = require('http'); // require the vanilla http server
const { Server } = require('socket.io');
// require socket.io
const server = http.createServer(app); // create our server
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
}); // create our IO sockets

io.on('connection', (socket) => {
  socket.on('join room', (username) => { // logging in
    socket.join(username);
    const altSocket = socket;
    altSocket.data.username = username; // store username into socket
  });

  socket.on('leave room', () => {
    socket.leave(socket.data.username); // logging out
    const altSocket = socket;
    altSocket.data.username = '';
  });

  socket.on('new message', (friendName) => { // send message notification to receiver
    socket.broadcast.to(friendName).emit('new message', socket.data.username);
  });

  socket.on('new follow', (friendName) => { // send follow notification to receiver
    socket.broadcast.to(friendName).emit('new follow', socket.data.username);
  });
});

// routers
const accountRouter = require('./routes/account');
const itemRouter = require('./routes/item');
const buyerRouter = require('./routes/buyer');
const chatRouter = require('./routes/chat');

// makes userUploads public
app.use('/userUploads', express.static('userUploads'));

// enables cross origin resource sharing
app.use(cors());

// express bodyParser middleware
app.use(express.json());

// cookies and sessions
app.use(
  cookieSession({
    name: 'session',
    keys: ['secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

app.use(bodyParserErrorHandler());

// using routers, all routers will be prefixed with /name-of-prefix-route
app.use('/account', accountRouter);
app.use('/item', itemRouter);
app.use('/buyer', buyerRouter);
app.use('/chat', chatRouter);

// default error handling
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).send(`There was an error with error message: ${err}!`);
});

// Start listening for requests
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`MongoDB is connected at ${MONGO_URI}`);
});
