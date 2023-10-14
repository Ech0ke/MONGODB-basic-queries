const { MongoClient } = require("mongodb");

// MongoDB connection string
const uri = "mongodb://localhost:27017/ship_db";

async function main() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db();

    // Drop current data
    await database.dropDatabase();

    // Create the Ship collection
    const shipCollection = database.collection("Ship");
    const shipResult = await shipCollection.insertMany([
      {
        Name: "Ship 1",
        Type: "Cargo Ship",
        RegistrationNumber: "REG123",
        MaximumCapacity: 500,
        Cargo: {
          Type: "Goods",
          Quantity: 100,
          Weight: 2000,
          DestinationPortID: "destination-port-id-1",
        },
      },
      {
        Name: "Ship 2",
        Type: "Passenger Ship",
        RegistrationNumber: "REG456",
        MaximumCapacity: 200,
        Cargo: null,
      },
    ]);

    // Create the Port collection
    const portCollection = database.collection("Port");
    const portResult = await portCollection.insertMany([
      {
        Name: "Port A",
        Location: "Location A",
        Services: ["Service 1", "Service 2"],
      },
      {
        Name: "Port B",
        Location: "Location B",
        Services: ["Service 3", "Service 4"],
      },
    ]);

    console.log(`${shipResult.insertedCount} ships were inserted`);
    console.log(`${portResult.insertedCount} ports were inserted`);

    const firstPort = await portCollection.findOne({});
    const secondPort = await portCollection.find({}).skip(1).next();

    console.log(firstPort);
    console.log(secondPort);
  } finally {
    // Close the connection
    await client.close();
  }
}

main().catch(console.error);
