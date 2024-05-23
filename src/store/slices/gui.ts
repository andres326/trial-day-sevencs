import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IGUIState {
	mapState: {
		lat: number;
		lon: number;
		zoom: number
	}
}

const initialState: IGUIState = {
	mapState: {
		lat: 53.51,
		lon: 9.54,
		zoom: 7,
	},
};

export const guiSlice = createSlice({
	name: 'gui',
	initialState,
	reducers: {
		moveEnd: (state, action: PayloadAction<IGUIState>) => {
			const { mapState } = action.payload
			const newState = {
				mapState: {
					...state.mapState,
					...mapState
				}
			}
			return newState
		}
	}
})

export default guiSlice.reducer
export const { moveEnd } = guiSlice.actions