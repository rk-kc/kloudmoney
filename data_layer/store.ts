// This is a sample code for the store.ts file
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';

const store = configureStore({
	reducer: {
		data: dataReducer,
	},
});

export default store;
