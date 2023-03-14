const washingtonLat = 38.89511;

const washingtonLon = -77.03637;

const toRad = (value: number): number => (value * Math.PI) / 180;

const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  lat1 = toRad(lat1);
  lat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;

  return d;
};

const getDistanceToUSA = (lat: number, lon: number): number =>
  getDistance(lat, lon, washingtonLat, washingtonLon);

export const distanceHelper = {
  getDistance,
  getDistanceToUSA,
};
