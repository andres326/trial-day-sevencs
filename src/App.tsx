//import Map from './components/Map.tsx'

import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    })

    console.log(osmLayer)
    const map = new Map({
      target: "map",
      layers: [osmLayer],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(undefined)
  }, []);

  return (
    <div style={{ height: '600px', width: '800px' }} id="map" />
  );
}

export default App;
