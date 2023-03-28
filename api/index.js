const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load env variables
const app = express();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});