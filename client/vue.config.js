// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData:
          '@import "@/sass/_variables.sass", "@/sass/_globals.sass", "@/sass/_header.sass", "@/sass/_list.sass", "@/sass/_form.sass"',
      },
    },
  },
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
        },
      },
    },
  },
};
