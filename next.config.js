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
    STEAM_KEY: process.env.STEAM_KEY,
    REACT_APP_ETH_CHAIN_ID:process.env.REACT_APP_ETH_CHAIN_ID,
    REACT_APP_BSC_CHAIN_ID:process.env.REACT_APP_BSC_CHAIN_ID,
    REACT_APP_POLYGON_CHAIN_ID:process.env.REACT_APP_POLYGON_CHAIN_ID,
    REACT_APP_NETWORK_ETH_NAME:process.env.REACT_APP_NETWORK_ETH_NAME,
    REACT_APP_NETWORK_BSC_NAME:process.env.REACT_APP_NETWORK_BSC_NAME,
    REACT_APP_NETWORK_POLYGON_NAME:process.env.REACT_APP_NETWORK_POLYGON_NAME,
    REACT_APP_NETWORK_URL:process.env.REACT_APP_NETWORK_URL,
    REACT_APP_ETHERSCAN_BASE_URL:process.env.REACT_APP_ETHERSCAN_BASE_URL,
    REACT_APP_BSCSCAN_BASE_URL:process.env.REACT_APP_BSCSCAN_BASE_URL,
    REACT_APP_POLSCAN_BASE_URL:process.env.REACT_APP_POLSCAN_BASE_URL,
    REACT_APP_FORMATIC_KEY:process.env.REACT_APP_FORMATIC_KEY,
    REACT_APP_FORTMATIC_KEY_TEST:process.env.REACT_APP_FORTMATIC_KEY_TEST,
    REACT_APP_ETH_NETWORK_NAME:process.env.REACT_APP_ETH_NETWORK_NAME,
    REACT_APP_METAMASK_DEEP_LINK:process.env.REACT_APP_METAMASK_DEEP_LINK,
    REACT_APP_BSC_RPC_URL:process.env.REACT_APP_BSC_RPC_URL,
    REACT_APP_POLYGON_RPC_URL:process.env.REACT_APP_POLYGON_RPC_URL,
    REACT_APP_BSC_BSC_CHAIN_ALIAS:process.env.REACT_APP_BSC_BSC_CHAIN_ALIAS,
    REACT_APP_BSC_ETH_CHAIN_ALIAS:process.env.REACT_APP_BSC_ETH_CHAIN_ALIAS,
    REACT_APP_BSC_POLYGON_CHAIN_ALIAS:process.env.REACT_APP_BSC_POLYGON_CHAIN_ALIAS,
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
