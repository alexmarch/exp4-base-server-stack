const webpack = require('webpack');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

module.exports = (app, cb) => {
	const wc = webpack([
		// Configuration Object
		{
			mode: process.env.NODE_ENV !== 'production' ? 'development' : process.env.NODE_ENV,
			entry: {
				app: [path.resolve(__dirname, './public/src/index.js'), 'webpack-hot-middleware/client']
			},
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, './public/dist')
			},
			devServer: {
				contentBase: './dist',
				hot: true
			},
			// target: 'node',
			// node: {
			// 	__dirname: false
			// },
			resolve: {
				modules: [path.resolve(__dirname, '../node_modules'), 'node_modules'],
				alias: {
					'vue$': 'vue/dist/vue.esm.js', // 'vue/dist/vue.common.js' for webpack 1
					'react-dom': '@hot-loader/react-dom'
				}
			},
			plugins: [
				new webpack.HotModuleReplacementPlugin()
			],
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						use: {
							loader: "babel-loader",
							options: {
								presets: [
									"@babel/env",
									"@babel/react"
								],
								plugins: [
									"react-hot-loader/babel",
									["@babel/plugin-proposal-class-properties", { "loose": true }]
								]
							}
						}
					},
					{
						test: /\.scss$/,
						use: [
							"style-loader",
							"css-loader",
							"sass-loader"
						]
					}
				]
			}
		}
	]);
	app.use(webpackDevMiddleware(wc, {
		logLevel: 'debug',
		publicPath: '/'
	}));
	app.use(webpackHotMiddleware(wc));
	if (typeof cb === 'function') cb();
	// wc.watch(
	// 	{
	// 		hot: true,
	// 		aggregateTimeout: 300
	// 	},
	// 	(err, stats) => {
	// 		if (err || stats.hasErrors()) {
	// 			// Handle errors here
	// 			console.error('Error:', err, stats);
	// 			return;
	// 		}
	// 		// Done processing
	// 		console.log(
	// 			'Webpack done.',
	// 			stats.toString({ chunks: false, colors: true })
	// 		);
	// 		if (typeof cb === 'function') cb();
	// 	}
	// );

};
