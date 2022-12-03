import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createNonceMiddleware(window.piSettings.nonce));

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
