import apiFetch from '@wordpress/api-fetch';

apiFetch.use(apiFetch.createNonceMiddleware(window.piSettings.nonce));

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
