import React, { useState, useEffect } from "react";
import bandsData from "../public/data/metal_bands_2017.json";

export default function BandsList({}) {
  const [bands, setBands] = useState([]);
  const [allStyles, setAllStyles] = useState([]);
  const [selectedStyle, setSelectedStyle] = useState("");
  const [allOrigins, setAllOrigins] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [allYears, setAllYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    // Sort band_name in alphabetical order
    const sortedBands = bandsData.sort((a, b) => {
      const bandNameA = (a.band_name || "").trim().toLowerCase();
      const bandNameB = (b.band_name || "").trim().toLowerCase();

      if (bandNameA < bandNameB) {
        return -1;
      }
      if (bandNameA > bandNameB) {
        return 1;
      }
      return 0;
    });
    console.log("sortedBands", sortedBands);

    setBands(sortedBands);

    // Extract all styles
    const getAllStyles = (data) => {
      const styles = [];
      for (const band of data) {
        if (band.style) {
          const styleList = band.style.split(",");
          for (const style of styleList) {
            if (!styles.includes(style.trim())) {
              styles.push(style.trim());
            }
          }
        }
      }
      return styles;
    };

    const allStyles = getAllStyles(bandsData);
    console.log("allStyles", allStyles);

    // Sort styles alphabetically
    const sortedStyles = allStyles.sort();
    console.log("sortedStyles", sortedStyles);
    setAllStyles(sortedStyles);

    // Extract all origins

    const getAllOrigins = (data) => {
      const origins = [];
      for (const band of data) {
        if (band.origin) {
          const originList = band.origin.split(",");
          for (const origin of originList) {
            if (!origins.includes(origin.trim())) {
              origins.push(origin.trim());
            }
          }
        }
      }
      return origins;
    };

    const allOrigins = getAllOrigins(bandsData);

    // Sort origins alphabetically
    const sortedOrigins = allOrigins.sort();
    console.log("sortedOrigins", sortedOrigins);
    setAllOrigins(sortedOrigins);

    //Extract all years
    const getAllYears = (data) => {
      const years = [];
      for (const band of data) {
        if (band.formed) {
          const year = band.formed.trim();
          if (!years.includes(year)) {
            years.push(year);
          }
        }
      }
      return years;
    };

    const allYears = getAllYears(bandsData);
    console.log("allYears", allYears);

    // Sort years
    const sortedYears = allYears.sort();
    console.log("sortedYears", sortedYears);
    setAllYears(sortedYears);
  }, []);

  // Filter bands with the selected style
  const filteredBands = bands.filter((band) => {
    if (!selectedStyle && !selectedOrigin && !selectedYear) {
      return bands; // Include all bands when no style or origin is selected
    }

    let styleMatches = true;
    let originMatches = true;
    let yearMatches = true;

    if (selectedStyle) {
      styleMatches = band.style && band.style.includes(selectedStyle);
    }

    if (selectedOrigin) {
      originMatches = band.origin && band.origin.includes(selectedOrigin);
    }

    if (selectedYear) {
      yearMatches = band.formed && band.formed.includes(selectedYear);
    }

    return styleMatches && originMatches && yearMatches;
  });
  console.log("filtered", filteredBands);

  return (
    <div className="mainDiv">
      <h1>Band List</h1>
      <div className="styleList">
        <label htmlFor="styleFilter">Filter by Style:</label>
        <select
          name="styles"
          id="styleSelect"
          value={selectedStyle}
          onChange={(e) => setSelectedStyle(e.target.value)}
        >
          <option value="">All Styles</option>
          {allStyles.map((style, index) => (
            <option key={index} value={style}>
              {style}
            </option>
          ))}
        </select>
      </div>
      <div className="originList">
        <label htmlFor="originFilter">Filter by Country:</label>
        <select
          name="origins"
          id="originSelect"
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
        >
          <option value="">All Countries</option>
          {allOrigins.map((origin, index) => (
            <option key={index} value={origin}>
              {origin}
            </option>
          ))}
        </select>
      </div>
      <div className="yearList">
        <label htmlFor="yearFilter">Filter by years:</label>
        <select
          name="year"
          id="yearSelect"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">All years</option>
          {allYears.map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <ul className="bandList">
        {filteredBands.map((band, index) => (
          <li key={index}>
            <strong>{band.band_name}</strong> - {band.origin}
          </li>
        ))}
      </ul>
    </div>
  );
}
