const express = require('express');
const AuthRouter = require('./api/auth/auth');
const ConnectToMangoose = require('./utils/connectMangoose');
const ListsRouter = require('./api/list/router');
const TusksRouter = require('./api/tusks/router');
const app = express();
app.use(express.json());

// Connect to MongoDB
ConnectToMangoose();
app.use('/auth', AuthRouter);
app.use('/lists', ListsRouter);
app.use('/tuks', TusksRouter);
// Start server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
