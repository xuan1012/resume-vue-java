// 这里包含了：
// loading动画；
// 删除目标文件夹；
// 执行webpack构建；
// 输出信息；
// webpack编译之后会输出到配置里面指定的目标文件夹；删除目标文件夹之后再创建是为了去除旧的内容，以免产生不可预测的影响。
'use strict'
// 检查NodeJS和npm的版本。
require('./check-versions')()

process.env.NODE_ENV = 'production'

// ora插件，实现node.js命令行环境的loading效果和显示各种状态的图标等。
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
// 用于在控制台输出带颜色字体的插件。
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('building for production...')
spinner.start()

// rimraf插件，每次启动编译或者打包之前，先把整个dist文件夹删除，然后再重新生成dist。
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      //如果使用 ts 加载程序，将此设置为 true 将使 TypeScript 错误在生成期间显示。
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
