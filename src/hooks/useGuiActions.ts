import { IGUIState, moveEnd } from "../store/slices/gui";
import { useAppDispatch } from "./store";

export const useGuiActions = () => {
	const dispatch = useAppDispatch()

	const updateMapState = (mapState: IGUIState) => {
		dispatch(moveEnd(mapState))
	}

	return { updateMapState }
}