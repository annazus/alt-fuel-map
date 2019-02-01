export function getCurrentLocation(callback) {
  console.log("getCurrentLocation");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => callback(position));
  }
}
