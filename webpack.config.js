const { resolve, join } = require('path');
// const WebpackIndexHTMLPlugin = require('@open-wc/webpack-index-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DirectoryNamedWebpackPlugin = require("directory-named-webpack-plugin");

const prod = process.env.NODE_ENV === 'production';


const polyfills = [
  {
    from: join(process.cwd(), 'index.html'),
    to: '.',
    flatten: true
  },
];

const scssLoaders = [
  {
    loader: 'css-loader',
    options: {
      // importLoaders: 1,
      sourceMap: !prod,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: !prod,
      plugins: () => [autoprefixer()],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sourceMap: !prod,
      sassOptions: {
        outputStyle: 'expanded',
      }
    },
  },
];

const sharedConfig = {
  output: {
    path: join(process.cwd(), 'dist'),
    // publicPath: `${config.publicPath}`,
    // filename: '[name].js',
    // chunkFilename: `js/[name]-chunk-[chunkhash].js`,
  },
  resolve: {
    plugins: [
      new DirectoryNamedWebpackPlugin(true),
    ]
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        oneOf: [
          {
            resourceQuery: /lazy/, // foo.scss?lazy
            use: [
              {
                loader: 'style-loader',
                options: { 
                  injectType: 'lazyStyleTag',
                  },
              },
              scssLoaders,
            ].reduce((acc, val) => acc.concat(val), []),
          },
          {
            // if .scss files are included by JS or HTML files, inline and don't spit out a file
            issuer: /(\.js$|\.html$)/,
            use: [scssLoaders].reduce((acc, val) => acc.concat(val), []),
          },
          // {
          //   // otherwise extract the result and write out a .css file per usual
          //   use: [MiniCssExtractPlugin.loader, scssLoaders].reduce(
          //     (acc, val) => acc.concat(val),
          //     []
          //   ),
          // },
        ],
      },
    ],
  },
  optimization: !prod ? {} : {
    minimize: true,
    minimizer: [new TerserPlugin({
      sourceMap: !prod,
      terserOptions: {
        safari10: true,
      },
    })],
  },
  mode: !prod ? 'development' : 'production',
  devtool: !prod ? 'source-map': 'none',
  plugins: [
    new NunjucksWebpackPlugin({
      templates: [
        {
          from: 'src/templates/index.njk',
          to: 'index.html'
        },
      ]
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    })
  ],
};

function getBabelConfig({ isModern = false }){
  const browsers = isModern ? [
    'last 2 Chrome versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'last 2 Edge versions',
    'Firefox ESR',
  ] : [
    'IE 11',
  ];

  return {
    "presets": [
      [
        "@babel/preset-env",
        {
          "targets": {
            browsers,
          },
          useBuiltIns: 'entry',
          corejs: 3,
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      ['@babel/proposal-decorators', { decoratorsBeforeExport: true } ],
    ],
  }
}

const modernConfig = merge(sharedConfig, {
  entry: './index.js',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      { 
        test: /\.js/, 
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: getBabelConfig({ isModern: true })
        }
      },
    ]
  },
});

const legacyConfig = merge(sharedConfig, {
  entry: './index.legacy.js',
  output: {
    filename: '[name].legacy.js',
  },
  module: {
    rules: [
      { 
        test: /\.js/, 
        // exclude: /node_modules/,
        use: { 
          loader: 'babel-loader',
          options: getBabelConfig({ isModern: false })
        }
      },
    ]
  },
});

const configs = [ modernConfig ];

if (prod) {
  configs.push(legacyConfig);
}

module.exports = configs;
