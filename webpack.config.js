
var webpack = require('webpack');

module.exports = {
	config: {
		entry: {
			'index':'./src/index.js',
		},
		output: {
			path: 'builds',
			filename: '[name].bundle.js',
			sourceMapFilename: '[name].bundle.map'
		},
		devtool:'source-map',
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				name: 'main',
				children: true,
				minChunks: 2
			})
		],
		module: {
			loaders: [
				{ test: /\.s?css$/, loaders: ['style-loader','css-loader','sass-loader']},
				{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query:{presets:['es2015','react','stage-0']} },
				{test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader?mimetype=image/svg+xml'},
				{test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
				{test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/font-woff"},
				{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader?mimetype=application/octet-stream"},
				{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file-loader"},
			]
		}	
	},
	watchOptions: {
		aggregateTimeout:300,
		poll:true
	},
	watchHandler: function(err,stats) {
		if(err) {
			console.log(err);
		}
		console.log(stats.toString({chunks:false,colors:true}));
	}
};
