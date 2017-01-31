module.exports = [
  {
    entry: './lib/index.js',
    output: {
      filename: 'bundle.js',
      library: ['ViewportMonitor'],
      libraryTarget: 'window',
    },
    externals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
    }
  },
  {
    entry: 'react',
    output: {
      filename: 'react.js',
      library: 'React',
      libraryTarget: 'window',
    }
  },
  {
    entry: 'react-dom',
    output: {
      filename: 'react-dom.js',
      library: 'ReactDOM',
      libraryTarget: 'window',
    }
  },
];
