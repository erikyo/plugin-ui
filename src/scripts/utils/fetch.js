/* global piSettings */
import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createNonceMiddleware(piSettings.nonce));

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
