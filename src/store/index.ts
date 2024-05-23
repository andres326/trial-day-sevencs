import { configureStore } from "@reduxjs/toolkit";
import guiReducer from './slices/gui.ts'

export const store = configureStore({
	reducer: {
		gui: guiReducer
	}
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch