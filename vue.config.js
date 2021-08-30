module.exports = {
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.coffee$/,
      use: ['coffee-loader'],
    });

    const newRule = {
      test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
      use: [
        {
          loader: 'E:\\Sameera\\MyProjects\\build-a-bot\\node_modules\\url-loader\\dist\\cjs.js',
          options: {
            limit: 5000,
            fallback: {
              loader: 'E:\\Sameera\\MyProjects\\build-a-bot\\node_modules\\file-loader\\dist\\cjs.js',
              options: {
                name: 'img/[name].[hash:8].[ext]',
              },
            },
          },
        },
      ],
    };

    const imageRuleIndex = config.module.rules
      .findIndex((x) => x.test.source.includes('png|jpe?g|gif'));

    config.module.rules.splice(imageRuleIndex, 1, newRule);
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      },
    },
  },
};
