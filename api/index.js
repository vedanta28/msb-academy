const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Load env variables
const app = express();
const PORT = process.env.PORT || 6900;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});