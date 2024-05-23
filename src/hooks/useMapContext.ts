import { useContext } from "react";
import { MapContext } from "../context/map";

export const useMapContext = () => {
	const currentMapContext = useContext(MapContext);

	if (!currentMapContext) {
		throw new Error(
			"useMapContext has to be used within <CurrentMapContext.Provider>"
		);
	}

	return currentMapContext;
};