// rollup.config.js
const commonjs = require("rollup-plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const image = require("rollup-plugin-image");
const babel = require("@rollup/plugin-babel");
const { terser } = require("rollup-plugin-terser");
const resolve = require("@rollup/plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const minify = require("rollup-plugin-minify");
const { dts } = require("rollup-plugin-dts");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const json = require("@rollup/plugin-json");

module.exports = [
  {
    input: "src/index.ts", // Update with your entry file
    output: [
      {
        name: "amirmuha-react-table",
        file: "dist/index.js",
        format: "esm",
      },
      // {
      //   name: "amirmuha-react-table",
      //   file: "dist/cjs/index.js",
      //   format: "cjs",
      //   sourcemap: true,
      // },
      // {
      //   name: "amirmuha-react-table",
      //   file: "dist/esm/index.js",
      //   format: "esm",
      //   sourcemap: true,
      // },
      // {
      //   name: "amirmuha-react-table",
      //   file: "dist/umd/index.js",
      //   format: "umd",
      //   sourcemap: true,
      //   globals: {
      //     react: "React", // Define global dependencies for UMD
      //     "react-dom": "ReactDOM", // Add more if needed
      //   },
      // },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(), // resolves npm modules
      commonjs(), // converts CommonJS modules to ES6
      image(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true,
        config: {
          path: "./postcss.config.js",
        },
        extensions: [".css"],
        minimize: true,
      }),
      terser({ compress: true, keep_classnames: true, format: false }),
    ],
  },
  {
    input: ["src/index.ts"],
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];
