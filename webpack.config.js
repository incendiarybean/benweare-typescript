const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    entry: {
        index: "./server/index.ts",
        // build: "./server/build.ts",
    },
    mode: "development",
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    module: {
        rules: [{ test: /\.ts$/, use: "ts-loader" }],
    },
    resolve: {
        alias: {
            "@resources": path.join(__dirname, "/server/resources/"),
            "@handlers": path.join(__dirname, "./server/handlers/"),
            "@lib/types": path.join(__dirname, "/server/lib/types.ts"),
        },
        extensions: [".ts"],
    },
    externals: [nodeExternals()],
};
