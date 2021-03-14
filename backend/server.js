const express = require('express'); 
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

require('dotenv').config();

const productRoute = require('./Routes/Product');
app.use(`/product`,productRoute);

const server = app.listen('5019', () => {
    console.log(`Server is running on port ${server.address().port}`);
});

module.exports = server; 