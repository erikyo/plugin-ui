const defaultConfig = require('@wordpress/scripts/config/webpack.config');
const path = require('path');

const entry = {};
['plugin-admin', 'plugin-settings'].forEach(
	(script) =>
		(entry[script] = path.resolve(process.cwd(), `src/${script}.js`))
);

module.exports = {
	...defaultConfig,
	entry,
	output: {
		path: path.join(__dirname, './build'),
	},
	externals: {
		react: 'React',
		'react-dom': 'ReactDOM',
	},
};
