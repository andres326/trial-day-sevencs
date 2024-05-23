import { useEffect } from 'react'
import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import MapEvent from 'ol/MapEvent';
import { useAppSelector } from "./hooks/store.ts";
import { useGuiActions } from './hooks/useGuiActions.ts';
import { useMapContext } from './hooks/useMapContext.ts';
import { ToggleButton } from './components/ToggleButton.tsx';

function App() {

  const { openStreetMapLayer, openStreetMapSource, setMap } = useMapContext()
  const { mapState } = useAppSelector((state) => state.gui)
  const { updateMapState } = useGuiActions()

  useEffect(() => {
    openStreetMapLayer.setSource(openStreetMapSource)

    const map = new Map({
      target: "map", //* id of the map div
      view: new View({
        center: transform([mapState.lon, mapState.lat], "EPSG:3857", "EPSG:4326"),
        zoom: mapState.zoom,
      }),
      controls: [],
    })
    setMap(map)
    map.addLayer(openStreetMapLayer)

    map.on('moveend', handleMoveEndEvent)
    return () => {
      map.setTarget(undefined)
    }
  }, [])

  const handleMoveEndEvent = (event: MapEvent) => {
    const map = event.map
    const view = map.getView()
    const center = view.getCenter() || [0, 0]
    const [lon, lat] = transform(center, "EPSG:3857", "EPSG:4326");
    const zoom = view.getZoom() || mapState.zoom

    updateMapState({ mapState: { lon, lat, zoom } })

  }
  return (
    <>
      <div style={{ height: '600px', width: '800px' }} id="map" />
      <ToggleButton />
    </>
  )
}

export default App;
