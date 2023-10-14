export const shipData = [
  {
    Name: "Ship 1",
    Type: "Cargo Ship",
    RegistrationNumber: "REG123",
    MaximumCapacity: 500,
    Cargo: {
      Type: "Goods",
      Quantity: 100,
      Weight: 2000,
      DestinationPortID: "destination-port-id-1", // Use an existing Port ID
    },
  },
  {
    Name: "Ship 2",
    Type: "Passenger Ship",
    RegistrationNumber: "REG456",
    MaximumCapacity: 200,
    Cargo: null, // No cargo for this ship
  },
];
