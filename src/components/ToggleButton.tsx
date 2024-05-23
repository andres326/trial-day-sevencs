import { useMapContext } from "../hooks/useMapContext.ts"

export function ToggleButton() {
	const { map, wmsLayerActive,wmsLayer, wmsSource, toggleWmsLayer } = useMapContext()

	const handleClick = (): void => {
		toggleWmsLayer()
		if(!wmsLayerActive){
			wmsLayer.setSource(wmsSource)
			map!.addLayer(wmsLayer)
		}else{
			map!.removeLayer(wmsLayer)
		}
	}

	return <button onClick={handleClick}>Put WMS Layer</button>
}