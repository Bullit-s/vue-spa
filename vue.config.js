const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
      },
    },
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
          @import "./src/styles/styles.scss";
        `,
      },
    },
  },
});
