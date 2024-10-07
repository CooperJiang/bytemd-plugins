import path from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default [
  {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
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
          { from: 'src/style/index.css', to: 'style' },
          
        ],
      }),
    ],
    devtool: 'inline-source-map',
    experiments: {
      outputModule: true,
    },
  },
  {
    mode: 'development',
    entry: './src/index.ts',
    output: {
      filename: 'index.cjs',
      path: path.resolve(__dirname, 'dist'),
      library: {
        type: 'commonjs2'  // CommonJS 模块类型
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
