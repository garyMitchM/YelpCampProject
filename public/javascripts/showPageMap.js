// const { campgroundSchema } = require("../../schemas");

mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/bright-v8", // style URL
  center: campgrounds.geometry.coordinates, // starting position [lng, lat]
  zoom: 10, // starting zoom
  projection: "globe", // display the map as a 3D globe
});
map.on("style.load", () => {
  map.setFog({}); // Set the default atmosphere style
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(campgrounds.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 }).setHTML(
      `<h3>${campgrounds.title}</h3><p>${campgrounds.location}</p>`
    )
  )
  .addTo(map);
