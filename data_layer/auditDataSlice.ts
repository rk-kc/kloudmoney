import { createSlice } from '@reduxjs/toolkit';
import { AuditProps } from '../components/interfaces/interfaces';

export const auditDataSlice = createSlice({
	name: 'auditData',
	initialState: <AuditProps>{
		relatedId: '',
		auditData: [],
	},
	reducers: {
		createAudit: (state, action) => {
			state = action.payload;
		},
		updateAuditData: (state, action) => {
			state.auditData.push(action.payload);
		},
	},
});

// export actions
export const { createAudit, updateAuditData } = auditDataSlice.actions;
export default auditDataSlice.reducer;
