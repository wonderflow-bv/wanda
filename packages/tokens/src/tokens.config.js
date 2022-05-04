module.exports = {
  source: ['src/configs/**/*.json'],
  platforms: {
    web: {
      basePxFontSize: 18,
      buildPath: 'platforms/web/',
      transformGroup: 'custom-web',
      files: [
        {
          format: 'css/variables',
          destination: 'tokens.css',
          filter: (token) => !token.name.endsWith('-primitive')
        },
        {
          format: 'json/nested',
          destination: 'tokens.json'
        }
      ],
      options: {
        showFileHeader: true
      }
    }
  }
}
