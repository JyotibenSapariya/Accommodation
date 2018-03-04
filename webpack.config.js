module.exports = {
    entry: "./app/app.jsx",
    output: {
        filename: "public/bundle.js"
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                include: /app/,
                loader: "babel",
                query: {
                    presets: ["react", "es2015"]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=./img/[name].[ext]"
            }

        ],
        resolve: {
            extensions: ['', '.js', '.jsx', '.css']
        }

    },
    devtool: "eval-source-map"
};
