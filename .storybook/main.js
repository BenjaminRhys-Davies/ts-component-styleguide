module.exports = {
  addons: [
    '@storybook/addon-jest/register',
    '@storybook/addon-knobs/register',
  ],
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async config => {
    [
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              mimetype: 'application/font-woff',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              mimetype: 'application/font-woff2',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.[ot]tf(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              mimetype: 'application/octet-stream',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              mimetype: 'application/vnd.ms-fontobject',
              name: 'fonts/[name].[ext]',
            }
          }
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
          },
          // Optional
          {
            loader: require.resolve('react-docgen-typescript-loader'),
          },
        ],
      },
    ].forEach(rule => config.module.rules.push(rule));

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};
