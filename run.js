require('dotenv').config();
const express = require('express');
const app = express();
const noteRouter = require('./app/routers/note');

app.use(express.json());

// ROUTES
app.get('/api/index', (req, res) => {
    res.json({
        success: 1,
        message: 'OK'
    });
});
app.use('/api/note', noteRouter);

// PORT
const port = process.env.APP_PORT || 3000; // set PORT=[]
app.listen(port, () => console.log(`listening on port ${port}...`));
