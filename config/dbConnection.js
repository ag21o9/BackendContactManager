var mongoose = require('mongoose');

const dbconnect = async ()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("DATABASE CONNECTED : ",connect.connection.host,connect.connection.name);
    } catch (error) {
        console.log(error);
           
    }
}

module.exports = dbconnect;