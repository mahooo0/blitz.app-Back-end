const express = require('express');
const AuthRouter = require('./api/auth/auth');
const ConnectToMangoose = require('./utils/connectMangoose');
const ListsRouter = require('./api/list/router');
const TusksRouter = require('./api/tusks/router');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
ConnectToMangoose();
app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API');
});
app.use('/auth', AuthRouter);
app.use('/lists', ListsRouter);
app.use('/tuks', TusksRouter);
// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
