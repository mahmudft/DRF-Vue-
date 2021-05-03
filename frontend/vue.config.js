const BundleTracker = require("webpack-bundle-tracker");
module.exports = {
    publicPath: "http://localhost:8080/",
    outputDir: './dist',


    chainWebpack: config => {

        config.optimization
            .splitChunks(false)

        config
            .plugin('BundleTracker')
            .use(BundleTracker, [{ filename: './webpack-stats.json' }])

        config.resolve.alias
            .set('__STATIC__', 'static')

        config.devServer
            .public('http://localhost:8080')
            .host('localhost')
            .port(8080)
            .hotOnly(true)
            .watchOptions({ poll: 1000 })
            .https(false)
            .headers({ "Access-Control-Allow-Origin": ["\*"] })
    }
};

/* devServer: {
  proxy: {
      "^/": {
          target: "http://127.0.0.1:8000",
          ws: true,
          changeOrigin: true
      }
  }
},
crossorigin: "anonymous",
}*/

/*
chainWebpack: config => {
    config.optimization.splitChuncks(false)
    config
        .plugin('BundleTracker')
        .use(BundleTracker, [{ filename: './webpack-stats.json' }])

    config.resolve.alias
        .set('__STATIC__', 'static')

    config.devServer
        .public('http://0.0.0.0:8080')
        .host('0.0.0.0')
        .port(8080)
        .hotOnly(true)
        .watchOptions({ poll: 1000 })
        .https(false)
        .headers({ "Access-Control-Allow-Origin": ["\*"] })


}
}

const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
publicPath: "http://localhost:8080/",
outputDir: './dist/',

chainWebpack: config => {

    config.optimization
        .splitChunks(false)

    config
        .plugin('BundleTracker')
        .use(BundleTracker, [{ filename: '../../statics/webpack-stats.json' }])

    config.resolve.alias
        .set('__STATIC__', 'static')

    config.devServer
        .public('http://localhost:8080')
        .host('localhost')
        .port(8080)
        .hotOnly(true)
        .watchOptions({ poll: 1000 })
        .https(false)
        .headers({ "Access-Control-Allow-Origin": ["\*"] })
}
};


*/