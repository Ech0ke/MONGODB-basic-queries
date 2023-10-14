const { MongoClient, ObjectId } = require("mongodb");
const { initData } = require("./initData");

// MongoDB connection string
const uri = "mongodb://localhost:27017/ship_db";

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db();
    // Add data to db
    await initData(database);

    const portCollection = database.collection("Port");
    const shipCollection = database.collection("Ship");

    const firstPort = await portCollection.findOne({});
    const secondPort = await portCollection.find({}).skip(1).next();

    portByIdObjectId = new ObjectId(firstPort._id.toString());
    const portById = await portCollection.findOne({
      _id: portByIdObjectId,
    });

    console.log(firstPort._id.toString());
    console.log(secondPort);
    console.log(` found port ${portById}`);
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
