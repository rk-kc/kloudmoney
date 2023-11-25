export type NewScreenParamsList = {
	NewSalaryScreen: undefined;
	NewCategoryScreen: undefined;
	SetBreakdownScreen: undefined;
};

export interface CategoryBreakdownProps {
	categoryId: string;
	name: string;
	percentage: number;
}
