const path = require('path');
const srcPath = path.resolve(__dirname, `./src/`);
const distPath = path.resolve(__dirname, `./dist/`);

module.exports = async function(mode = `production`) {
	const entryFiles = {
		script: `${srcPath}/script.js`
	};

	return {
		mode: mode,
		target: `node`,
		optimization: { minimize: false },
		devtool: 'cheap-eval-source-map',
		context: __dirname,
		externals: {
			'sharp': 'commonjs sharp'
		},
		node: {
			console: true,
			global: true,
			process: true,
			Buffer: true,
			setImmediate: true,
			__dirname: true,
			__filename: true,
			fs: `empty`,
			child_process: `empty`
		},
		resolve: {
			extensions: [`.js`],
			alias: {
				'@': srcPath
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ `babel-loader` ]
				}
			]
		},
		entry: entryFiles,
		output: {
			path: distPath,
			filename: `[name].js`
		}
	};
};
