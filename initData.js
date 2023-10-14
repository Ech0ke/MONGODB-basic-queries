async function initData(database) {
  const { portData } = require("./portData");
  const { shipData } = require("./shipData");
  // Drop current data
  await database.dropDatabase();

  // Create the Ship collection
  const shipCollection = database.collection("Ship");
  const shipResult = await shipCollection.insertMany(shipData);

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
}

module.exports = { initData };
