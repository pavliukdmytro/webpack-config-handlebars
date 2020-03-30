const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundles/[name].js',
		chunkFilename: "bundles/[name].js"
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp)$/i,
				include: [
					path.resolve(__dirname, 'src/images/')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							esModule: false,
						}
					},
				],
			},
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						cacheDirectory: true
					}
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: {
					loader: 'file-loader',
					options: {
						name: 'fonts/[name].[ext]',
					}
				},
			},
			{
				test: /\.hbs$/,
				loader: "handlebars-loader",
				query: {
					partialDirs: [
						path.join(__dirname, 'src/templates')
					],
					inlineRequires: '/src/images/'
				},
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/pages/index.hbs",
			filename: "index.html",
			templateParameters: require('./src/data/index.json')
		}),
		new CleanWebpackPlugin(),
		new CopyPlugin([
			{ from: 'src/images/', to: 'images/' }
		]),
	]
};
