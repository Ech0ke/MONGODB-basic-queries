const { ObjectId } = require("bson");

const shipData = [
  {
    Name: "Ship 1",
    Type: "Cargo Ship",
    RegistrationNumber: "REG123",
    MaximumCapacity: 500,
    Cargo: [
      {
        _id: getRandomUUID(),
        Type: "Goods",
        Quantity: 100,
        Weight: 3000,
        DestinationPortID: "destination-port-id-1", // Use an existing Port ID
      },
      {
        _id: getRandomUUID(),
        Type: "Food",
        Quantity: 50,
        Weight: 1500,
        DestinationPortID: "destination-port-id-1", // Use an existing Port ID
      },
    ],
  },
  {
    Name: "Ship 2",
    Type: "Passenger Ship",
    RegistrationNumber: "REG456",
    MaximumCapacity: 200,
    Cargo: [
      {
        _id: getRandomUUID(),
        Type: "Goods",
        Quantity: 5,
        Weight: 150,
        DestinationPortID: "destination-port-id-1", // Use an existing Port ID
      },
    ], // No cargo for this ship
  },
];

function getRandomUUID() {
  return new ObjectId();
}
module.exports = { shipData };
