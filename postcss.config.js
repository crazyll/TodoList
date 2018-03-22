// postcss.config.js  postcss: 对CSS进行后处理优化，这里只用了autoprefixer给css代码加前缀
const autoprefixer = require('autoprefixer')

module.exports = {
	plugins: [
		autoprefixer()
	]
}