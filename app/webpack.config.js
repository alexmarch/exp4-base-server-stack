const webpack = require('webpack');
const path = require('path');

module.exports = cb => {
	const wc = webpack([
		// Configuration Object
		{
			mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
			entry: path.resolve(__dirname, './public/src/index.js'),
			output: {
                filename: 'bundle.js',
                path: path.resolve(__dirname, './public/dist')
			},
			resolve: {
				modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
				alias: {
					'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
				}
			}

		}
	]);
	wc.watch(
        {
			aggregateTimeout: 300
		},
		(err, stats) => {
			if (err || stats.hasErrors()) {
				// Handle errors here
				console.error(err);
				return;
			}
			// Done processing
			console.log(
				'Webpack done.',
				stats.toString({ chunks: false, colors: true })
			);
			if (typeof cb === 'function') cb();
		}
	);
};
