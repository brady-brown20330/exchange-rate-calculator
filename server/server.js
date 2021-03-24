const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require("path");

app.listen(PORT, () => {
  console.log(`Hello, Your server is running on PORT: ${PORT}`);
});

app.use(express.static(path.join(__dirname, '../public')));
