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
};