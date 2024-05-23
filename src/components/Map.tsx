import Map from "ol/Map";
import View from "ol/View";
import { transform } from "ol/proj";
import { useEffect, useState } from "react";
import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import ImageWMSSource from "ol/source/ImageWMS";
import TileImage from "ol/source/TileImage";
import OSM from "ol/source/OSM";


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

	useEffect(() => {

		const osmLayer = new TileLayer({
			preload: Infinity,
			source: new OSM(),
		})
		const map = new Map({
			layers: [
				osmLayer
			],
			target: "map", //* id of the map div
			view: new View({
				center: [0, 0],
				zoom: 0,
			}),
			controls: [],
		})

		return () => map.setTarget(undefined)
	}, [])

	return (
		<div id='map' style={{ width: '800px', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
	)
}