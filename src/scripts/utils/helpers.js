/**
 * It takes a query string and a parameter name, and returns the value of the parameter if it exists, or false if it doesn't
 *
 * @param {string} queryString - The query string to parse.
 * @param {string} parameter   - The parameter you want to get from the query string.
 * @return {string} The value of the parameter in the query string.
 */
export function getFromQueryString(queryString, parameter) {
	const params = new Proxy(new URLSearchParams(queryString), {
		get: (searchParams, prop) => searchParams.get(prop),
	});

	return params[parameter] || false;
}

/**
 * Delay returns a promise that resolves after the given number of milliseconds.
 *
 * @param {number} ms - The number of milliseconds to delay.
 */
export const delay = (ms) => new Promise((r) => setTimeout(r, ms));
