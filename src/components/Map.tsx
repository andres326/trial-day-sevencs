import Map from "ol/Map";
import View from "ol/View";
import { useEffect, useState } from "react";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import ImageWMSSource from "ol/source/ImageWMS";
import TileImage from "ol/source/TileImage";
import { useAppSelector } from "../hooks/store";


export default function CustomMap() {

	const [openStreetMapLayer] = useState<TileLayer<TileImage>>(
		new TileLayer({ zIndex: 1 }),
	);

	const [openStreetMapSource] = useState<TileImage>(
		new TileImage({
			url: "//a.tile.openstreetmap.org/{z}/{x}/{y}.png",
			wrapX: true,
		}),
	);
	const [wmsLayer] = useState<ImageLayer<ImageWMSSource>>(
		new ImageLayer({ zIndex: 2 }),
	);
	const [wmsSource] = useState<ImageWMSSource>(
		new ImageWMSSource({
			ratio: 1,
			url: "https://wms.sevencs.com/",
			params: { LAYERS: "GIS-ENC-OFFSHORE", CSBOOL: "181", CSVALUE: ",,,,,2" },
		}),
	);

	const { mapState } = useAppSelector((state) => state.gui)

	useEffect(() => {
		console.log({ mapState})
		openStreetMapLayer.setSource(openStreetMapSource)
		wmsLayer.setSource(wmsSource)

		const map = new Map({
			target: "map", //* id of the map div
			view: new View({
				center: [mapState.lon, mapState.lat],
				zoom: mapState.zoom,
			}),
			controls: [],
		})

		map.addLayer(openStreetMapLayer)
		//map.addLayer(wmsLayer)

		return () => map.setTarget(undefined)
	}, [])

	return (
		<div style={{ height: '600px', width: '800px' }} id="map" />
	)
}