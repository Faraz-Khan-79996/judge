const express = require('express');
const path = require('path')
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const port = process.env.PORT || 3000;
const problemRouter = require('./routes/problem')



app.use(cors())
app.set("view engine", "ejs")

app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.CONNECTION_STRING);
  console.log("database connected");
}

app.use('/api' , problemRouter)





app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});