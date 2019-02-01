const GOOGLE_MAPS_URL = "https://maps.googleapis.com/maps/api/js";
const GOOGLE_MAPS_SCRIPT_TAG_ID = "GOOGLE_MAPS_SCRIPT_TAG";

const loadGoogleMapsAPI = (API_Key, callback) => {
  const mapsAPI_Tag = document.getElementById(GOOGLE_MAPS_SCRIPT_TAG_ID);

  if (!mapsAPI_Tag) {
    const newMapsAPI_Tag = document.createElement("script");

    newMapsAPI_Tag.src = `${GOOGLE_MAPS_URL}?key=${API_Key}`;
    newMapsAPI_Tag.id = GOOGLE_MAPS_SCRIPT_TAG_ID;
    document.body.appendChild(newMapsAPI_Tag);
    newMapsAPI_Tag.onerror = function() {
      console.log("Error loading " + newMapsAPI_Tag.src);
    };
    newMapsAPI_Tag.onload = () => {
      if (callback) callback();
    };
  }
  if (mapsAPI_Tag && callback) callback();
};
export default loadGoogleMapsAPI;
