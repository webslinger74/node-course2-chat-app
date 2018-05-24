const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
console.log(publicPath);
console.log(__dirname);

var app = express();
app.use(express.static(publicPath));


app.listen(port, ()=>{
    console.log(`connected to server on ${port}`);
});
