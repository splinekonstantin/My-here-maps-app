// Initialize the platform object:
const platform = new H.service.Platform({
  apikey: 'js_6nm8IYUAOC33d8bCfGVMWPhPYN_JQWHxBGOKQMzY',
});

// Obtain the default map types from the platform object
const maptypes = platform.createDefaultLayers();

// Instantiate (and display) a map object:
const map = new H.Map(
  document.getElementById('mapContainer'),
  maptypes.vector.normal.map,
  {
    zoom: 10,
    center: { lng: 13.4, lat: 52.51 },
  }
);
