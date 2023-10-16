const { ObjectId } = require("bson");

const portData = [
  {
    Name: "Port of Los Angeles",
    Location: "Los Angeles, California, USA",
    Services: ["Container Handling", "Customs Clearance", "Warehousing"],
  },
  {
    Name: "Port of Rotterdam",
    Location: "Rotterdam, Netherlands",
    Services: ["Cruise Ship Terminal", "Cargo Inspection", "Marine Fueling"],
  },
  {
    Name: "Port of Sydney",
    Location: "Sydney, Australia",
    Services: ["Fishing Dock", "Yacht Marina", "Boat Repair"],
  },
  {
    Name: "Port of Singapore",
    Location: "Singapore",
    Services: ["Container Handling", "Dry Docking", "Ship Repairs"],
  },
  {
    Name: "Port of Houston",
    Location: "Houston, Texas, USA",
    Services: [
      "Petroleum Terminal",
      "Lighthouse Service",
      "Tugboat Assistance",
    ],
  },
  {
    Name: "Port of Klaipeda",
    Location: "Klaipeda, Lithuania",
    Services: [
      "Petroleum Terminal",
      "Container Handling",
      "Dry Docking",
      "Ship Repairs",
    ],
  },
  {
    Name: "Port of Miami",
    Location: "Miami, Florida, USA",
    Services: ["Bulk Cargo Terminal", "Cruise Ship Dock", "Ship Chandlery"],
  },
  {
    Name: "Port of Dubai",
    Location: "Dubai, United Arab Emirates",
    Services: ["Passenger Terminal", "Bunkering Service", "Waste Collection"],
  },
  {
    Name: "Port of Hong Kong",
    Location: "Hong Kong",
    Services: ["Container Depot", "Ship Agency", "Pilotage Services"],
  },
  {
    Name: "Port of Mumbai",
    Location: "Mumbai, India",
    Services: [
      "Breakbulk Terminal",
      "Marine Surveying",
      "Firefighting Equipment",
    ],
  },
  {
    Name: "Port of Cape Town",
    Location: "Cape Town, South Africa",
    Services: [
      "Dry Bulk Terminal",
      "Crew Change Service",
      "Shore Power Supply",
    ],
  },
];

async function initData(database) {
  // Drop current data
  await database.dropDatabase();

  // Create Port collection
  const portCollection = database.collection("Port");
  const portResult = await portCollection.insertMany(portData);

  const portIds = portResult.insertedIds;

  const shipData = [
    {
      Name: "Bulk Carrier 1",
      Type: "Bulk Carrier",
      RegistrationNumber: "REG123",
      MaximumCapacity: 500,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Iron Ore",
          Quantity: 100,
          Weight: 3000,
          DestinationPortID: portIds[0],
        },
        {
          _id: getRandomUUID(),
          Type: "Grain",
          Quantity: 50,
          Weight: 1500.65,
          DestinationPortID: portIds[0],
        },
        {
          _id: getRandomUUID(),
          Type: "Coal",
          Quantity: 50,
          Weight: 1500.257,
          DestinationPortID: portIds[1],
        },
      ],
    },
    {
      Name: "Container Ship 1",
      Type: "Container Ship",
      RegistrationNumber: "REG124",
      MaximumCapacity: 750,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Consumer Electronics",
          Quantity: 200,
          Weight: 4500.56,
          DestinationPortID: portIds[2],
        },
      ],
    },
    {
      Name: "Cruise Ship 1",
      Type: "Cruise Ship",
      RegistrationNumber: "REG456",
      MaximumCapacity: 200,
      Cargo: null,
    },
    {
      Name: "Tanker Ship 1",
      Type: "Tanker Ship",
      RegistrationNumber: "REG125",
      MaximumCapacity: 600,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Crude Oil",
          Quantity: 150,
          Weight: 3500,
          DestinationPortID: portIds[3],
        },
        {
          _id: getRandomUUID(),
          Type: "Chemical Compounds",
          Quantity: 80,
          Weight: 2200,
          DestinationPortID: portIds[4],
        },
      ],
    },
    {
      Name: "Ferry 1",
      Type: "Ferry",
      RegistrationNumber: "REG457",
      MaximumCapacity: 180,
      Cargo: null,
    },
    {
      Name: "Container Ship 2",
      Type: "Container Ship",
      RegistrationNumber: "REG126",
      MaximumCapacity: 550,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Automobiles",
          Quantity: 120,
          Weight: 2800,
          DestinationPortID: portIds[5],
        },
        {
          _id: getRandomUUID(),
          Type: "Consumer Electronics",
          Quantity: 90,
          Weight: 2100,
          DestinationPortID: portIds[2],
        },
      ],
    },
    {
      Name: "Tanker Ship 2",
      Type: "Tanker Ship",
      RegistrationNumber: "REG128",
      MaximumCapacity: 600,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Chemical Liquids",
          Quantity: 150,
          Weight: 3500,
          DestinationPortID: portIds[7],
        },
        {
          _id: getRandomUUID(),
          Type: "Chemical Compounds",
          Quantity: 80,
          Weight: 2200,
          DestinationPortID: portIds[4],
        },
      ],
    },
    {
      Name: "Container Ship 3",
      Type: "Container Ship",
      RegistrationNumber: "REG129",
      MaximumCapacity: 800,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Electrical Appliances",
          Quantity: 180,
          Weight: 6000,
          DestinationPortID: portIds[8],
        },
        {
          _id: getRandomUUID(),
          Type: "Clothing",
          Quantity: 120,
          Weight: 3000,
          DestinationPortID: portIds[6],
        },
      ],
    },
    {
      Name: "Tanker Ship 3",
      Type: "Tanker Ship",
      RegistrationNumber: "REG130",
      MaximumCapacity: 700,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Petroleum Products",
          Quantity: 160,
          Weight: 5000,
          DestinationPortID: portIds[9],
        },
        {
          _id: getRandomUUID(),
          Type: "Chemical Compounds",
          Quantity: 90,
          Weight: 2300,
          DestinationPortID: portIds[4],
        },
      ],
    },
    {
      Name: "Cruise Ship 2",
      Type: "Cruise Ship",
      RegistrationNumber: "REG131",
      MaximumCapacity: 250,
      Cargo: null,
    },
    {
      Name: "Bulk Carrier 2",
      Type: "Bulk Carrier",
      RegistrationNumber: "REG132",
      MaximumCapacity: 600,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Cereals",
          Quantity: 120,
          Weight: 3200,
          DestinationPortID: portIds[0],
        },
        {
          _id: getRandomUUID(),
          Type: "Wood Products",
          Quantity: 70,
          Weight: 1900,
          DestinationPortID: portIds[1],
        },
      ],
    },
    {
      Name: "Ferry 2",
      Type: "Ferry",
      RegistrationNumber: "REG133",
      MaximumCapacity: 220,
      Cargo: null,
    },
    {
      Name: "Container Ship 4",
      Type: "Container Ship",
      RegistrationNumber: "REG134",
      MaximumCapacity: 900,
      Cargo: [
        {
          _id: getRandomUUID(),
          Type: "Consumer Electronics",
          Quantity: 250,
          Weight: 7000,
          DestinationPortID: portIds[3],
        },
      ],
    },
  ];

  // Create Ship collection
  const shipCollection = database.collection("Ship");
  const shipResult = await shipCollection.insertMany(shipData);

  console.log(`${shipResult.insertedCount} ships were inserted`);
  console.log(`${portResult.insertedCount} ports were inserted`);
}

module.exports = { initData };

function getRandomUUID() {
  return new ObjectId();
}
