import svelte from "rollup-plugin-svelte";
import pkg from "./package.json";

export default {
  input: pkg.svelte,
  output: { file: pkg.module, format: "esm" },
  plugins: [svelte()]
};
