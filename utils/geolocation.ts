
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
 * Converts ANY U.S. ZIP code to latitude & longitude using a free API.
 * Results are cached for performance.
 */
export type LatLng = { latitude: number; longitude: number };

const cache: Record<string, LatLng> = {}; // in-memory cache

export async function getCoordsFromZip(zip: string): Promise<LatLng | null> {
  const z = (zip || "").trim();

  // Valid ZIP check
  if (!/^\d{5}$/.test(z)) return null;

  // ✅ Cached? return instantly
  if (cache[z]) return cache[z];

  try {
    const response = await fetch(`https://api.zippopotam.us/us/${z}`);
    if (!response.ok) return null;

    const data = await response.json();
    const place = data.places?.[0];
    if (!place) return null;

    const coords = {
      latitude: parseFloat(place.latitude),
      longitude: parseFloat(place.longitude),
    };

    cache[z] = coords; 
    return coords;
  } catch {
    return null;
  }
}