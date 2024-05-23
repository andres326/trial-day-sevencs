import { createSlice } from "@reduxjs/toolkit";

export interface IGUIState {
	mapState: {
		lat: number;
		lon: number;
		zoom: number
	}
}

const initialState: IGUIState = {
	mapState: {
		lat: 51.82,
		lon: 10.45,
		zoom: 4,
	},
};

export const guiSlice = createSlice({
	name: 'gui',
	initialState,
	reducers: {}
})

export default guiSlice.reducer