const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const extractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === "development"

const config = {
	target: 'web',
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		filename: "bundle.[hash:8].js",//正式开发环境才能用chunkhash
		path: path.resolve(__dirname, "dist")
	},
	module: {
		rules: [
			{test: /\.vue$/, use: 'vue-loader'},
			{test: /\.jsx$/, use: 'babel-loader'},
			{test: /\.css$/, use: ['style-loader', 'css-loader']},
			{test: /\.(gif|jpg|jpeg|png|svg)$/,
				use: [
				{
					loader: 'url-loader',
					options: {
						limit: 1024,
						name: '[name]-aaa.[ext]'
					}
				}]
			},
			
		]

	},
	plugins: [
		new webpack.DefinePlugin({
			//可以在js中调用process.env,webpack根据该参数选择打包的版本
			'process.env': {
				NODE_ENV: isDev ? '"development"' : '"production"'
			}
		}),
		new HTMLPlugin(),
	]
}

if(isDev){
	config.module.rules.push(
		{test: /\.styl/, use: [
			'style-loader',
			'css-loader',
			{
				loader: 'postcss-loader',
				options: {
					sourceMap: true//复用前面stylus生成的css Map
				}
			},
			'stylus-loader'//一层一层向上处理，loader搭配使用
		]}
	)
	config.devtool = '#cheap-module-eval-source-map';//配置es6页面调试，
	config.devServer = {
		port: '8000',
		host: '0.0.0.0',//可以通过本机ip访问
		overlay: {
			errors: true,
		},
		open: true,
		hot: true,//修改页面后只更新加载对应的组件效果
	}
	config.plugins.push(
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	)

}else{
	config.entry = {
		app: path.join(__dirname, 'src/index.js'),
		vendor: ['vue']
	}
	config.output.filename = '[name].[chunkhash:8].js'
	config.module.rules.push(
		{test: /\.styl/, use: extractTextPlugin.extract(
			{
				fallback: 'style-loader',//'style-loader'的作用是把css代码放到js中
				use: [
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: true//复用前面stylus生成的css Map
						}
					},
					'stylus-loader'//一层一层向上处理，loader搭配使用
				]
			}
		)
	}
	)

	// config.optimization = {
	// 	splitChunks:{
	// 		cacheGroups:{ // 这里开始设置缓存的 chunks
	// 			commons: {
	// 				chunks: 'initial',
	// 				minChunks: 2, maxInitialRequests: 5,
	// 				minSize: 0
	// 			  },
	// 			vendor: { // key 为entry中定义的 入口名称
	// 				chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步) 
	// 				name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
	// 			}
	// 		}
	// 	},
	// 	runtimeChunk: true
		
	// }

	
	  config.optimization = {	
		splitChunks: {	
		  cacheGroups: {	
			commons: {	
			  chunks: 'initial',	
			  minChunks: 2, maxInitialRequests: 5,	
			  minSize: 0	
			},	
			vendor: {	
			  test: /node_modules/,	
			  chunks: 'initial',	
			  name: 'vendor',	
			  priority: 10,	
			  enforce: true	
			}	
		  }	
		},	
		runtimeChunk: true	
	  }

	

	config.plugins.push(
		new extractTextPlugin('style.[chunkhash:8].css'),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'vendor'
		// }),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'runtime'
		// })
	)
}


module.exports = config