const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 6000;
require("dotenv").config()
const app = express()
app.use(cors())
app.use(express.json());


// mongodb server connecting
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const run = async() => {
  try {
    client.connect();
    console.log("db c")
  } catch (error) {
    console.log(error.message);
  }
}
run()
const UserDataCollection = client.db("DataEntry").collection("data");

app.get("/", async(req, res) => {
  try {
    res.send({
      status: true,
      data: "data_entry_server_running"
    })
  } catch (error) {
    res.send({
      status: false,
      message: error.message
    })
  }
});
app.post("/userData", async(req, res) => {
  try {
    const data = req.body;
    // const responseData = UserDataCollection.insertOne()
    console.log(data)
    res.send({
      status: true,
      data: responseData
    })
  } catch (error) {
    res.send({
      status: false,
      message: error.message
    })
  }
});

app.listen(port, () => console.log(`server is running ${port}`))