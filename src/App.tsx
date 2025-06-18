
import { useState, useMemo } from 'react';
import { MapLayerMouseEvent } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "maplibre-react-components/style.css" // for RGradientMap component
import { RMap, RLayer, RSource, RMarker, RNavigationControl } from "maplibre-react-components";
import { townData } from "./util";


const location: [number, number] = [-0.451, 51.473]; // 0: longitude (N/S); 1: latitude (E/W)
// Heathrow 51.473°N latitude and 0.451°W longitude

function App() {

  const [red, setRed] = useState(true);
  const [markerPosition, setMarkerPosition] = useState<null | [number, number]>(
    null,
  );

  const paintStyle = useMemo(
    () => ({
      "fill-outline-color": "rgba(0,0,0,0.1)",
      "fill-color": red ? "rgba(255,0,0,0.3)" : "rgba(0,0,0,0.3)",
    }),
    [red],
  );
 
  // creates a marker when a location is clicked on the map
  function handleClick(e: MapLayerMouseEvent) {
    setMarkerPosition(e.lngLat.toArray());

    console.log(`Longitude: ${e.lngLat.lng}, Latitude: ${e.lngLat.lat} `)
  }

  return (
    <RMap
      minZoom={6}
      onClick={handleClick}
      initialCenter={location}
      initialZoom={12}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
      <RSource key="town" id="town" type="geojson" data={townData} />
      <RLayer
        key="town-fill"
        id="town-fill"
        source="town"
        type="fill"
        paint={paintStyle}
      />

    <RMarker longitude={location[0]} latitude={location[1]} />

    <RNavigationControl 
      position='top-left' 
      showCompass={true} />

    {markerPosition && (
        <RMarker longitude={markerPosition[0]} latitude={markerPosition[1]} />
      )}
      <button className="button" color='' onClick={() => setRed((r) => !r)}>
          {red ? "set Gray" : "set Red"}
        </button>

      
    </RMap>
  );
}
 
export default App;
