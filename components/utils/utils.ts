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
