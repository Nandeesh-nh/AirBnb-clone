
if(token) {


maptilersdk.config.apiKey = token ;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  style: "streets",
  center:[longitute,latitude], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// Set optionsf
const marker = new maptilersdk.Marker({color : 'red'})
  .setLngLat([longitute,latitude])
  .setPopup(new maptilersdk.Popup().setHTML("<p>Exact location will be provided after booking</p>"))
  .addTo(map);

}