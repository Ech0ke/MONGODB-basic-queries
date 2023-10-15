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

    // console.log(firstPort._id.toString());
    // console.log(secondPort);
    // console.log(` found port ${portById}`);

    const allCargos = await shipCollection
      .aggregate([
        {
          $unwind: "$Cargo",
        },
        {
          $project: {
            _id: 0,
            ShipName: "$Name",
            CargoType: "$Cargo.Type",
            CargoQuantity: "$Cargo.Quantity",
            CargoWeight: "$Cargo.Weight",
            DestinationPortID: "$Cargo.DestinationPortID",
          },
        },
      ])
      .toArray();

    console.log(`Every cargo from every ship:\n\n`);
    console.log(allCargos);

    const groupContainersByPortQuery = [
      {
        $lookup: {
          from: "Ship",
          localField: "_id",
          foreignField: "Cargo.DestinationPortID",
          as: "ships",
        },
      },
      {
        $project: {
          _id: 0,
          Name: 1,
          Location: 1,
          ContainerCount: {
            $size: {
              $ifNull: ["$ships", []],
            },
          },
        },
      },
    ];

    const groupContainersByPortResult = await portCollection
      .aggregate(groupContainersByPortQuery)
      .toArray();

    console.log(`Container count headed to each port:\n\n`);
    console.log(groupContainersByPortResult);
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
