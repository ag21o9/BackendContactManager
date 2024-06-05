const express = require('express');
const dotenv = require('dotenv').config();
const ctrouter = require('./routes/contactRoutes.js')
const userrouter = require('./routes/userRoutes.js')
const errorHandler = require('./middleware/erroHandler.js');
const dbconnect = require('./config/dbConnection.js');

const app = express();
const port = process.env.PORT || 3000;

dbconnect();

app.use(express.json());
app.use('/api/contacts',ctrouter);
app.use('/api/users',userrouter);

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});

