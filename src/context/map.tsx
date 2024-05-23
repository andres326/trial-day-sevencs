import ImageLayer from "ol/layer/Image";
import TileLayer from "ol/layer/Tile";
import Map from "ol/Map";
import ImageWMSSource from "ol/source/ImageWMS";
import TileImageSource from "ol/source/TileImage";
import TileImage from "ol/source/TileImage";
import { createContext, ReactNode, useState } from "react";

type Props = {
	children: ReactNode | ReactNode[]
}

export type MapContextType = {
	map: Map | undefined;
	setMap: (map: Map) => void,
	openStreetMapLayer: TileLayer<TileImageSource>;
	openStreetMapSource: TileImageSource;
	wmsLayer: ImageLayer<ImageWMSSource>;
	wmsSource: ImageWMSSource;
	wmsLayerActive: boolean;
	toggleWmsLayer: () => void;
};

export const MapContext = createContext<MapContextType | null>(null);

export function MapProvider({ children }: Props) {

	const [map, setMap] = useState<Map>()
	const [wmsLayerActive, setWmsLayerActive] = useState(false)

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

	const toggleWmsLayer = () => setWmsLayerActive((prev: boolean) => !prev)
	const putMap = (map: Map) => setMap(map)

	return <MapContext.Provider value={
		{
			map,
			setMap: putMap,
			openStreetMapLayer,
			openStreetMapSource,
			wmsLayer,
			wmsSource,
			wmsLayerActive,
			toggleWmsLayer,
		}
	}>
		{children}
	</MapContext.Provider>
}