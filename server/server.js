const express = require('express');
const connectDB = require('../config/db');
const PORT = process.env.PORT || 5000;

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware body parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send(`API Running on ${PORT}`);
});

app.use('/api/questions', require('../routes/api/questions'));
app.use('/api/scores', require('../routes/api/scores'));

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});