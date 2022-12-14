const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;
require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

// mongodb server connecting
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    client.connect();
    console.log("db c");
  } catch (error) {
    console.log(error.message);
  }
};
run();
const UserDataCollection = client.db("DataEntry").collection("data");
const categoryDataCollection = client
  .db("DataEntry")
  .collection("categoryData");

app.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const responseData = await UserDataCollection.find({ email }).toArray();
    res.send({
      status: true,
      data: responseData,
    });
  } catch (error) {
    res.send({
      status: false,
      message: error.message,
    });
  }
});
app.get("/category", async (req, res) => {
  try {
    const responseData = await categoryDataCollection.find({}).toArray();
    res.send({
      status: true,
      data: responseData,
    });
  } catch (error) {
    res.send({
      status: false,
      message: error.message,
    });
  }
});
app.post("/userData", async (req, res) => {
  try {
    const responseData = await UserDataCollection.insertOne(req.body);
    res.status(200).send({
      status: true,
      data: responseData,
    });
  } catch (error) {
    res.status(403).send({
      status: false,
      message: error.message,
    });
  }
});

app.put("/UserData", async (req, res) => {
  try {
    console.log(req.body);
    const quire = { email: req.body.email };
    const updatedData = req.body;
    const option = { upsert: true };
    const Reviews = {
      $set: {
        name: updatedData.name,
        selectedData: updatedData.selectedData,
        message: updatedData.message,
        Option: updatedData.Option,
      },
    };
    const result = await UserDataCollection.updateOne(quire, Reviews, option);
    res.status(200).send({
      status: true,
      data: result
    });
  } catch (error) {
    res.status(401).send({
      states: false,
      error: error.message,
    });
  }
});

app.listen(port, () => console.log(`server is running ${port}`));
