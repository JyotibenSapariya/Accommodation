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
                loader: "style-loader!css-loader"
            }

        ]

    },
    devtool: "eval-source-map"
};
