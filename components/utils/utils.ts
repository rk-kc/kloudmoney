/**
 * A generic function that takes in an array of objects
 * The function loops through the objects and if one value is an empty string or 0
 * return a false value
 */

export function checkEmptyValues(
	arr: any,
	allowZeros: boolean = false
): boolean {
	for (const obj of arr) {
		for (const value of Object.values(obj)) {
			if (allowZeros) {
				if (value === '') throw new Error();
			} else {
				if (value === '' || value === 0) {
					throw new Error();
				}
			}
		}
	}
	return true;
}

/**
 * A generic function that takes in an object and calculates the sum of all the values
 * in the expenses array for each category
 */
export function calculateTotalExpensesByCategory(
	data: any
): Record<string, number> {
	const expenses = data.expenses;
	const categoryBreakdown = data.categoryBreakdown;

	const totalExpensesByCategory: Record<string, number> = {};

	// Initialize total expenses for each category to 0
	for (const category of categoryBreakdown) {
		totalExpensesByCategory[category.name] = 0;
	}

	// Calculate total expenses per category
	for (const expense of expenses) {
		const category = expense.category;
		const amount = expense.amount;

		if (totalExpensesByCategory.hasOwnProperty(category)) {
			totalExpensesByCategory[category] += amount;
		} else {
			totalExpensesByCategory[category] = amount;
		}
	}

	return totalExpensesByCategory;
}

export function calculateExpenseAmountByCategory(
	data: any,
	categoryName: string
): number {
	const expenses = data.expenses;
	let totalAmount = 0;

	for (const expense of expenses) {
		if (expense.category === categoryName) {
			totalAmount += expense.amount;
		}
	}

	return totalAmount;
}

export const calculateAmount = (amount: number, percentage: number) => {
	return (amount * percentage) / 100;
};

export const formatter = new Intl.NumberFormat('ja-JP', {
	style: 'currency',
	currency: 'JPY',
});
