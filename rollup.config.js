import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import typescript from "@rollup/plugin-typescript";
export default [
  {
    input: "src/index.ts",
    output: {
      file: "dist/cjs/index.js",
      format: "cjs",
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), commonjs(), terser()],
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/es/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [typescript(), resolve(), commonjs(), terser()],
  },
];
