
/**
 * Calculates the distance between two points in miles given their latitudes and longitudes.
 */
export function getDistanceInMiles(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in miles
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Mocks the conversion of a zip code to latitude and longitude.
 * In a real application, this would use a geocoding API.
 */
export function getCoordsFromZip(zip: string): { latitude: number; longitude: number } | null {
  // Simple mock for demonstration. Returns coordinates for Orlando, FL for a common zip.
  if (zip.startsWith("328")) {
    return { latitude: 28.5383, longitude: -81.3792 };
  }
  // Add more mock zips if needed
  if (zip.startsWith("327")) {
    return { latitude: 28.6500, longitude: -81.3359 }; // Lake Mary
  }
  if (zip.startsWith("347")) {
    return { latitude: 28.4296, longitude: -81.4791 }; // Kissimmee
  }
  return null; // Invalid or unmocked zip
}
