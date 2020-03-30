const path = require('path');
const HandlebarsPlugin = require("handlebars-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
				test: /\.(html)$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: 'require',
						attrs: [':src'],
					}
				}
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
			}
		]
	},
	plugins: [
		new HandlebarsPlugin({
			entry: path.join(process.cwd(),'src/pages/index.hbs'),
			output: path.join(process.cwd(),'dist/index.html'),
			data: path.join(process.cwd(),'src/data/index.json'),
			partials: [
				path.join(process.cwd(),"src/components", "*", "*.hbs")
			],
		}),
		new CleanWebpackPlugin()
	]
};
