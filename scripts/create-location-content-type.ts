import pkg from "contentful-management";
const { createClient } = pkg;

const SPACE_ID = "1bkq4170d8hb";
const MANAGEMENT_TOKEN = "CFPAT-JGW3m0NFyjoDodaW0R3otydlz5eSkISXRIsoVwYSjbA";

async function createLocationContentType() {
  const client = createClient({ accessToken: MANAGEMENT_TOKEN });
  const space = await client.getSpace(SPACE_ID);
  const environment = await space.getEnvironment("master");

  console.log("Creating Location content type...");

  const contentType = await environment.createContentTypeWithId("location", {
    name: "Location",
    description: "Event venue and location details",
    displayField: "venueName",
    fields: [
      {
        id: "venueName",
        name: "Venue Name",
        type: "Symbol",
        required: true,
      },
      {
        id: "address",
        name: "Address",
        type: "Symbol",
        required: true,
      },
      {
        id: "city",
        name: "City",
        type: "Symbol",
        required: true,
      },
      {
        id: "postalCode",
        name: "Postal Code",
        type: "Symbol",
        required: false,
      },
      {
        id: "country",
        name: "Country",
        type: "Symbol",
        required: false,
      },
      {
        id: "latitude",
        name: "Latitude",
        type: "Number",
        required: false,
      },
      {
        id: "longitude",
        name: "Longitude",
        type: "Number",
        required: false,
      },
      {
        id: "byCar",
        name: "Directions by Car",
        type: "Text",
        required: false,
      },
      {
        id: "byPublicTransport",
        name: "Directions by Public Transport",
        type: "Text",
        required: false,
      },
      {
        id: "byTrain",
        name: "Directions by Train",
        type: "Text",
        required: false,
      },
      {
        id: "parkingInfo",
        name: "Parking Information",
        type: "Text",
        required: false,
      },
      {
        id: "isActive",
        name: "Is Active",
        type: "Boolean",
        required: false,
      },
    ],
  });

  await contentType.publish();
  console.log("Location content type created and published!");

  // Create location entry
  const entry = await environment.createEntry("location", {
    fields: {
      venueName: { "en-US": "Deloitte Frankfurt Office" },
      address: { "en-US": "Franklinstraße 50" },
      city: { "en-US": "Frankfurt am Main" },
      postalCode: { "en-US": "60486" },
      country: { "en-US": "Germany" },
      latitude: { "en-US": 50.1109 },
      longitude: { "en-US": 8.6821 },
      byCar: { "en-US": "From A5: Exit Frankfurt-Westhafen, follow signs to Messe/Westend. The office is located near Messe Frankfurt." },
      byPublicTransport: { "en-US": "U4 to Festhalle/Messe, then 5 min walk. S-Bahn S3/S4/S5/S6 to Frankfurt Messe, then 7 min walk." },
      byTrain: { "en-US": "From Frankfurt Hauptbahnhof: S-Bahn (3 stops) or taxi (10 min). From Frankfurt Airport: S-Bahn S8/S9 to Hauptbahnhof, then transfer." },
      parkingInfo: { "en-US": "Parking garage Messe Frankfurt (Parkhaus Rebstock) available. Limited street parking." },
      isActive: { "en-US": true },
    },
  });
  await entry.publish();
  console.log("Location entry created: Deloitte Frankfurt Office");
}

createLocationContentType().catch(console.error);
