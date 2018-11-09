const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
	mode: 'development',
	// Note: don't use 'eval-*'. it causes "'unsafe-eval' is not an allowed CSP error" when page script injected
	devtool: 'inline-cheap-source-map',

	output: {
		path: path.join(__dirname, '../dev/js'),
		filename: '[name].bundle.js',
		chunkFilename: '[id].chunk.js'
	},
	// '*' allows to use: import A from 'file.ext'
	// '.js' allows to use: import B from 'script' (This will import script.js)
	resolve: {
		extensions: ['*', '.js']
	},

	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(), // prevent emitting any asset to the browser when the code is not compiling
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('dev')
			}
		}),
		new webpack.IgnorePlugin(/[^/]+\/[\S]+.prod$/)
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			// {
			// 	test: /\.css$/,
			// 	use: [
			// 		'style-loader',
			// 		// Note: don't use sourceMap for content/page's CSS. it will cause CSP error.
			// 		// if you want sourceMap apply to popup or window, have separated js file instead of using devCommon
			// 		'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
			// 		{
			// 			loader: 'postcss-loader',
			// 			options: {
			// 				plugins: () => [autoprefixer]
			// 			}
			// 		}
			// 	]
			// },
			// {
			// 	test: /\.css$/,
			// 	use: ['style-loader', 'css-loader']
			// },
			// {
			// 	test: /\.scss$/,
			// 	use: ['style-loader', 'css-loader?importLoaders=1', 'sass-loader']
			// },
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader' // translates CSS into CommonJS modules
						},
						{
							loader: 'postcss-loader', // Run post css actions
							options: {
								plugins() {
									// post css plugins, can be exported to postcss.config.js
									return [autoprefixer];
								}
							}
						},
						{
							loader: 'sass-loader' // compiles SASS to CSS
						}
					]
				})
			},
			{
				test: /\.(jpg|png|gif|svg|pdf|ico)$/,
				use: [
					{
						// import 'imageFile' will be inlined into script with base64encoded.
						loader: 'url-loader'
					}
				]
			},
			{
				test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{ test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	}
};
