// This is a sample code for the store.ts file
import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import auditDataReducer from './auditDataSlice';

const store = configureStore({
	reducer: {
		data: dataReducer,
		auditData: auditDataReducer,
	},
});

export default store;
