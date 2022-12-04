/* global piSettings */
import apiFetch from '@wordpress/api-fetch';

/**
 * It returns an object with the query arguments for the WordPress REST API
 *
 * @param {string} [dataType=post]   - The type of data you want to query.
 * @param {number} [currentPage=0]   - The current page number.
 * @param {number} [postsPerPage=10] - The number of posts to display per page.
 */
export const queryArgs = (
	dataType = 'post',
	currentPage = 0,
	postsPerPage = 10
) => ({
	postType: dataType,
	post_status: 'publish',
	posts_per_page: postsPerPage,
	paged: currentPage,
	order: 'DESC',
	orderby: 'post-date',
	tax_query: {
		taxonomy: dataType !== 'post' ? dataType + '_cat' : 'category',
	},
});

/**
 * It sends a POST request to the `/plugin/v1/settings` endpoint with the options and nonce
 *
 * @param {Object} options - An object containing the options to update.
 * @param {string} nonce   - A nonce that is used to verify the request.
 *
 * @return {Promise} - a promise that will return an object with the settings and the validation results
 */
export function updateOption(options, nonce) {
	return apiFetch({
		path: '/plugin/v1/settings',
		method: 'POST',
		data: {
			options,
			nonce,
		},
	});
}

/**
 * It sends a POST request to the `/plugin/v1/manager/query` endpoint with the `args` and `nonce` arguments
 *
 * @param {Object} args  - The arguments to pass to the query.
 * @param {string} nonce - A random string that is used to prevent CSRF attacks.
 *
 * @return {Promise} The response to the query
 */
export function queryPost(args, nonce) {
	return apiFetch({
		path: '/plugin/v1/manager/query',
		method: 'POST',
		data: {
			args,
			nonce,
		},
	});
}

/**
 * It sends a POST request to the `/plugin/v1/manager/data` endpoint with the `datatype` and `nonce` parameters
 *
 * @param {string} datatype - The type of data you want to retrieve.
 * @param {string} nonce    - A random string that is used to identify the request.
 *
 * @return {Promise} The data is being returned.
 */
export function queryData(datatype, nonce) {
	return apiFetch({
		path: '/plugin/v1/manager/data',
		method: 'POST',
		data: {
			datatype,
			nonce,
		},
	});
}

/**
 * It takes a customArgs object as an argument, sets the wait state to true, increments the page number, and then queries the server for the next page of products
 *
 * @param {string} type - the requested post type
 * @param {number} p    - the query page
 *
 * @return {Promise} a promise.
 */
export const fetchPost = async (type, p) => {
	return queryPost(queryArgs(type, p), piSettings.nonce)
		.then((post) => {
			if (post.error) {
				throw new Error(post.error);
			}
			return post;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

/**
 * It takes a datatype as an argument, sets the wait state to true, queries the data, sets the wait state to false, and returns the data
 *
 * @param {string} datatype - The type of data you want to query.
 *
 * @return {Promise} a promise.
 */
export const fetchTableData = async (datatype) => {
	return queryData(datatype, piSettings.nonce)
		.then((res) => {
			if (res.error) {
				throw new Error(res.error);
			}
			return res;
		})
		.catch((err) => {
			throw new Error(err);
		});
};
