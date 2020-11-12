module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: '> 2% in CN and not ie <= 8 and not dead',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
    ["@babel/plugin-proposal-class-properties", { "loose": true }],
    ["@babel/plugin-transform-typescript", {"allowNamespaces": true}]
  ],
};
