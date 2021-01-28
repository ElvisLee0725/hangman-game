const express = require('express');
const connectDB = require('../config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Init Middleware body parser
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('API Running');
});

app.use('/api/questions', require('../routes/api/questions'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening to PORT ${PORT}`);
});