export default function injestBandName(bandsData) {
  // Create a new array to store bands without duplicates
  const uniqueBands = [];

  for (const band of bandsData) {
    const bandName = (band.band_name || "").trim().toLowerCase();
    let alreadyAdded = false;

    for (const uniqueBand of uniqueBands) {
      const uniqueBandName = (uniqueBand.band_name || "").trim().toLowerCase();

      if (bandName === uniqueBandName) {
        alreadyAdded = true;
        break;
      }
    }

    if (!alreadyAdded) {
      uniqueBands.push(band);
    }
  }
  console.log("uniqueBands", uniqueBands);
  // Sort band_name in alphabetical order
  const sortedBands = uniqueBands.sort((a, b) => {
    if (a.band_name < b.band_name) {
      return -1;
    }
    return 1;
  });
  console.log("sortedBands", sortedBands);
  return uniqueBands;
}
