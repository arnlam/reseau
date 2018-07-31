module.exports = {
  lintOnSave: false,

  pluginOptions: {
    apollo: {
      enableMocks: true,
      enableEngine: false,
    },
  },
  chainWebpack: config => {
    config.plugins
      .delete('split-manifest')
      .delete('inline-manifest')
  },
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: undefined,
};
