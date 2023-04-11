const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.tsx',

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: './public/index.html',
        }),
    ],

    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react',
                            [
                                '@babel/preset-typescript',
                                {
                                    allowNamespaces: true,
                                },
                            ],
                        ],
                    },
                },
            },
        ],
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.scss', '.css'],
    },
}
