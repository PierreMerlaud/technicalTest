const fs = require("fs");
const path = require("path");
const Papa = require("papaparse");

// Construct the path to the CSV file within the public directory
const csvFilePath = path.join(
  process.cwd(),
  "public",
  "data",
  "metal_bands_2017.csv"
);

// Read the CSV file
const csvData = fs.readFileSync(csvFilePath, "utf-8");

// Convert CSV to JSON
const jsonData = Papa.parse(csvData, { header: true });

// Construct the path to the output JSON file
const jsonFilePath = path.join(
  process.cwd(),
  "public",
  "data",
  "metal_bands_2017.json"
);

// Write the JSON data to the specified file path
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData.data, null, 2));
