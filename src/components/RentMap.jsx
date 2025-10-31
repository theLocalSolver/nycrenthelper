import React, { useEffect, useRef, useMemo } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RentMap({ selectedBoroughs, minRent, maxRent, setTopZipCodes }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const geoJsonLayerRef = useRef(null);

  // ✅ Normalize function to ensure consistency (handles spaces, hyphens, casing)
  const normalize = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/\s+/g, "")
      .replace(/[^a-z]/g, "");

  // ✅ Convert selectedBoroughs object into a normalized list of active boroughs
  const activeBoroughs = useMemo(() => {
    if (!selectedBoroughs) return [];
    if (Array.isArray(selectedBoroughs)) {
      return selectedBoroughs.map((b) => normalize(b));
    }
    return Object.keys(selectedBoroughs)
      .filter((k) => selectedBoroughs[k])
      .map((k) => normalize(k));
  }, [selectedBoroughs]);

  // ✅ Get color based on how well the area matches the user's preferences
  const getPreferenceColor = (feature) => {
    const rent = feature?.properties?.["Median-Rent"];
    const boroughNormalized = normalize(feature?.properties?.borough);

    const isPreferredBorough = activeBoroughs.includes(boroughNormalized);
    const isRentInRange = rent >= minRent && rent <= maxRent;
    const isRentSlightlyOff = rent >= minRent * 0.9 && rent <= maxRent * 1.1;

    let score = 0;
    if (isPreferredBorough && isRentInRange) score = 1; // ✅ perfect match
    else if (isPreferredBorough && isRentSlightlyOff) score = 0.8;
    else if (!isPreferredBorough && isRentInRange) score = 0.6;
    else if (!isPreferredBorough && isRentSlightlyOff) score = 0.4;
    else score = 0;

    // ✅ Smooth gradient colors (no yellow)
    if (score >= 0.9) return "#00FF7F"; // spring green
    if (score >= 0.7) return "#32CD32"; // lime green
    if (score >= 0.5) return "#FFA500"; // orange
    if (score >= 0.3) return "#FF4500"; // orange-red
    return "#8B0000"; // dark red
  };

  const styleFeature = (feature) => ({
    fillColor: getPreferenceColor(feature),
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.7,
  });

  // ✅ Load and update map
  useEffect(() => {
    const updateTopZipCodes = (data) => {
      // Compute top zip codes based on match score
      const scored = data.features
        .map((f) => {
          const rent = f.properties["Median-Rent"];
          const boroughNorm = normalize(f.properties.borough);
          const isPreferred = activeBoroughs.includes(boroughNorm);
          const isInRange = rent >= minRent && rent <= maxRent;
          const isSlightlyOff = rent >= minRent * 0.9 && rent <= maxRent * 1.1;

          let score = 0;
          if (isPreferred && isInRange) score = 1;
          else if (isPreferred && isSlightlyOff) score = 0.8;
          else if (!isPreferred && isInRange) score = 0.6;
          else if (!isPreferred && isSlightlyOff) score = 0.4;

          return { feature: f, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((x) => x.feature);

      setTopZipCodes(scored);
    };

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView(
        [40.7128, -74.006],
        11
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance.current);

      fetch("/data/merged.geojson")
        .then((res) => res.json())
        .then((data) => {
          geoJsonLayerRef.current = L.geoJSON(data, {
            style: styleFeature,
            onEachFeature: (feature, layer) => {
              const props = feature.properties;
              layer.bindPopup(`
                <strong>Borough:</strong> ${props.borough || "N/A"}<br>
                <strong>ZIP Code:</strong> ${props.postalCode || "N/A"}<br>
                <strong>Median Rent:</strong> $${Math.round(
                  props["Median-Rent"]
                ).toLocaleString()}
              `);
            },
          }).addTo(mapInstance.current);

          updateTopZipCodes(data);
        });
    } else if (geoJsonLayerRef.current) {
      geoJsonLayerRef.current.eachLayer((layer) => {
        layer.setStyle(styleFeature(layer.feature));
      });
    }

    // Update Top ZIPs on preference change
    fetch("/src/data/merged.geojson")
      .then((res) => res.json())
      .then((data) => updateTopZipCodes(data));
  }, [selectedBoroughs, minRent, maxRent]);

  // ✅ Legend items (consistent with colors)
  const legendItems = [
    { color: "#00FF7F", label: "Perfect match (borough + rent in range)" },
    {
      color: "#32CD32",
      label: "Rent slightly off, inside preferred borough",
    },
    { color: "#FFA500", label: "Rent in range, wrong borough" },
    { color: "#FF4500", label: "Rent slightly off, wrong borough" },
    { color: "#8B0000", label: "Worst match (borough & rent both off)" },
  ];

  return (
    <div>
      <div ref={mapRef} style={{ height: "600px", width: "100%" }} />

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Preference Legend</h3>
        <div className="flex flex-col gap-2">
          {legendItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              <div
                style={{
                  backgroundColor: item.color,
                  width: "20px",
                  height: "20px",
                  marginRight: "8px",
                }}
              ></div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-500 mt-2">
        Median rent data sourced from{" "}
        <a
          href="https://www.zillow.com/research/data/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          ZORI (Zillow Observed Rent Index)
        </a>
        .
      </div>
    </div>
  );
}

export default RentMap;
