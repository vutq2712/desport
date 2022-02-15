const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { i18n } = require('./next-i18next.config');

const { useBundleAnalyzer } = process.env;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  i18n,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
  },
  env: {
    API_END_POINT: process.env.API_END_POINT,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    GG_CLIENT_ID: process.env.GG_CLIENT_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    DISCORD_APP_ID: process.env.DISCORD_APP_ID,
    STEAM_KEY: process.env.STEAM_KEY
  },
  images: {
    domains: ['localhost', 'desports-dev.s3.ap-southeast-1.amazonaws.com'],
  },
  webpack(config, { isServer }) {
    config.plugins.push(
      ...[
        useBundleAnalyzer &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          reportFilename: isServer
            ? '../../bundle-report/server-report.html'
            : './bundle-report/client-report.html'
        })
      ].filter(Boolean)
    );

    return config;
  }
};
