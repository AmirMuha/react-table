// rollup.config.js
import commonjs from "rollup-plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import image from "rollup-plugin-image"; // Add this line
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import json from "@rollup/plugin-json";

const config = [
  {
    input: "src/index.ts", // Update with your entry file
    output: [
      {
        name: "amirmuha-react-table",
        file: "dist/index.js",
        format: "esm",
        sourcemap: true,
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
        plugins: [
          require("@fullhuman/postcss-purgecss")({
            content: ["./**/*.html", "./src/**/*.tsx"],
            defaultExtractor: (content) => {
              // Extract all CSS classes from the content.
              return content.match(/[A-Za-z0-9-]+/g) || [];
            },
          }),
          require("autoprefixer")(),
          require("cssnano")(),
        ],
      }),
      terser(),
      json(),
      babel({
        babelHelpers: "bundled", // Choose the helper method
        exclude: "node_modules/**", // Exclude external dependencies
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          "@babel/preset-typescript",
        ], // Add required presets
      }),
    ],
  },
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.css$/],
  },
];

export default config;
