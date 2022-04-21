module.exports = {
    productionSourceMap: false,
    lintOnSave: true,
    configureWebpack: {
      devServer : {
        host : "test.blocksdk.com",
        port : 443,
        https: true,
      },
    },
};
