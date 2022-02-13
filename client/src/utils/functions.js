import { getDistance, getPreciseDistance } from 'geolib';

export const mapEnumObject = (label, enumList) => {
  let obj = {};

  for (let enumItem of enumList) {
    if (label === enumItem.enum) {
      obj = enumItem;
    }
  }
  return obj;
};

export const getFoodyDistance = (user, foody) => {
  return getDistance(
    { latitude: user.lat, longitude: user.lng },
    { latitude: foody.lat, longitude: foody.lng }
  );
};

export const getPreciseFoodyDistance = (user, foody) => {
  return getPreciseDistance(
    { latitude: user.lat, longitude: user.lng },
    { latitude: foody.lat, longitude: foody.lng }
  );
};

// Calculate radius using radians
// Divide distance by radius of Earth
// Earth radius = 3,963 mi / 6,378 km

export const computeDistance = (user, foody) => {
  const prevLatInRad = toRad(user.lat);
  const prevLongInRad = toRad(user.lng);
  const latInRad = toRad(foody.lat);
  const longInRad = toRad(foody.lng);

  const distance =
    // In kilometers
    6377.830272 *
    // In Miles
    // 3,963 *
    Math.acos(
      Math.sin(prevLatInRad) * Math.sin(latInRad) +
        Math.cos(prevLatInRad) *
          Math.cos(latInRad) *
          Math.cos(longInRad - prevLongInRad)
    );
  return distance.toFixed(2);
};

function toRad(angle) {
  return (angle * Math.PI) / 180;
}
