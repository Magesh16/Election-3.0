const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://Magesh16:magesh@cluster0.l4csc.mongodb.net/Election3?retryWrites=true&w=majority";
const app = express();
app.use(express.json())
app.use(cors());


// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://Magesh16:magi_ash@16@cluster0.l4csc.mongodb.net/Election3.0?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("votes").collection("devices");
//   client.close();
//});


mongoose
  .connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log(err));

const routes = require('./routes/routes');
app.use('/', routes);

app.listen(3000, () => {
    console.log("server started");
})