module.exports = {
  presets: ['@vue/app'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
