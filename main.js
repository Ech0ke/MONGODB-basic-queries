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

    const groupShipsByCargoQuery = [
      {
        $group: {
          _id: {
            hasCargo: {
              $cond: {
                if: { $eq: ["$Cargo", null] },
                then: "Non cargo ships",
                else: "Cargo ships",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          Type: "$_id.hasCargo",
          Count: "$count",
          _id: 0,
        },
      },
    ];

    const groupShipsByCargoResult = await shipCollection
      .aggregate(groupShipsByCargoQuery)
      .toArray();

    console.log("\nShips grouped by type:");
    console.log(`${"Type".padEnd(25, " ")}${"Count".padEnd(25, " ")}`);
    groupShipsByCargoResult.forEach((result) => {
      console.log(
        `${result.Type.padEnd(25, " ")}${String(result.Count).padEnd(25, " ")}`
      );
    });

    const sumContainerWeightQuery = [
      {
        $unwind: {
          path: "$Cargo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: {
            ShipName: "$Name",
            ShipType: "$Type",
            RegistrationNumber: "$RegistrationNumber",
          },
          TotalContainerWeight: {
            $sum: "$Cargo.Weight",
          },
        },
      },
      {
        $project: {
          ShipName: "$_id.ShipName",
          ShipType: "$_id.ShipType",
          RegistrationNumber: "$_id.RegistrationNumber",
          TotalContainerWeight: 1,
          _id: 0,
        },
      },
    ];

    const sumContainerWeightResult = await shipCollection
      .aggregate(sumContainerWeightQuery)
      .toArray();

    console.log("\nShips grouped by their total container weight:");
    console.log(
      `${"Ship Name".padEnd(25, " ")}${"Ship Type".padEnd(
        25,
        " "
      )}${"Registration Number".padEnd(
        25,
        " "
      )}${"Total Container Weight (tons)".padEnd(25, " ")}`
    );
    11;
    sumContainerWeightResult.forEach((result) => {
      console.log(
        `${result.ShipName.padEnd(25, " ")}${result.ShipType.padEnd(
          25,
          " "
        )}${result.RegistrationNumber.padEnd(25, " ")}${
          result.TotalContainerWeight
        }`
      );
    });
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
