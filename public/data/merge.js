import fs from "fs";

// Load both files
const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
const map = JSON.parse(fs.readFileSync("map.geojson", "utf8"));

// Create a lookup for faster matching
const rentLookup = {};
data.forEach((d) => {
  rentLookup[String(d["ZipCode"])] = d["Median-Rent"];
});

// Filter and merge
const mergedFeatures = map.features
  .map((feature) => {
    const zip = feature.properties.postalCode; // adjust if your GeoJSON uses a different field
    const medianRent = rentLookup[zip];
    if (medianRent !== undefined) {
      feature.properties["Median-Rent"] = medianRent;
      return feature; // keep this feature
    }
    return null; // remove features with no rent
  })
  .filter((f) => f !== null);

// Create new GeoJSON
const mergedGeoJSON = {
  type: "FeatureCollection",
  features: mergedFeatures,
};

// Save merged file
fs.writeFileSync("merged.geojson", JSON.stringify(mergedGeoJSON, null, 2));
console.log(
  "✅ merged.geojson created! Only features with median rent are included."
);
