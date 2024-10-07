import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    mode: 'none',
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].[contenthash].js',
      library: {
        type: 'module' 
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/types', to: 'types' },
          { from: 'src/locales', to: 'locales' },
        ],
      }),
    ],
    devtool: 'inline-source-map',
    experiments: {
      outputModule: true,
    },
  },
  {
    mode: 'none',
    entry: './src/index.ts',
    output: {
      filename: 'index.cjs',
      chunkFilename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'commonjs2'
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: 'src/types', to: 'types' },
          { from: 'src/locales', to: 'locales' },
        ],
      }),
    ],
    devtool: 'inline-source-map',
    target: 'node',
  }
];
