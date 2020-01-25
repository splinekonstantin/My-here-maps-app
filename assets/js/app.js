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
    center: { lng: 114.107877, lat: 22.372081 },
  }
);

// Create the parameters for the routing request:
const routingParameters = {
  // The routing mode:
  mode: 'fastest;car',
  // The start point of the route:
  waypoint0: 'geo!22.372081,114.107877',
  // The end point of the route:
  waypoint1: 'geo!22.326442,114.167811',
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  representation: 'display',
};

// Define a callback function to process the routing response:
const onResult = function(result) {
  let route;
  let routeShape;
  let startPoint;
  let endPoint;
  let linestring;
  if (result.response.route) {
    // Pick the first route from the response:
    route = result.response.route[0];
    // Pick the route's shape:
    routeShape = route.shape;

    // Create a linestring to use as a point source for the route line
    linestring = new H.geo.LineString();

    // Push all the points in the shape into the linestring:
    routeShape.forEach(function(point) {
      const parts = point.split(',');
      linestring.pushLatLngAlt(parts[0], parts[1]);
    });

    // Retrieve the mapped positions of the requested waypoints:
    startPoint = route.waypoint[0].mappedPosition;
    endPoint = route.waypoint[1].mappedPosition;

    // Create a polyline to display the route:
    const routeLine = new H.map.Polyline(linestring, {
      style: { strokeColor: 'blue', lineWidth: 3 },
    });

    // Create a marker for the start point:
    const startMarker = new H.map.Marker({
      lat: startPoint.latitude,
      lng: startPoint.longitude,
    });

    // Create a marker for the end point:
    const endMarker = new H.map.Marker({
      lat: endPoint.latitude,
      lng: endPoint.longitude,
    });

    // Add the route polyline and the two markers to the map:
    map.addObjects([routeLine, startMarker, endMarker]);

    // Set the map's viewport to make the whole route visible:
    map.getViewModel().setLookAtData({ bounds: routeLine.getBoundingBox() });
  }
};

// Get an instance of the routing service:
const router = platform.getRoutingService();

// Call calculateRoute() with the routing parameters,
// the callback and an error callback function (called if a
// communication error occurs):
router.calculateRoute(routingParameters, onResult, function(error) {
  alert(error.message);
});
