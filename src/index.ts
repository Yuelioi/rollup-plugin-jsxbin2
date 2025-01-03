import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

interface Options {
  file: string; // need convert file path
  jsxbin?: string; // jsxbin path
}

export default function jsxbin2(options: Options) {
  const { file, jsxbin } = options;

  return {
    name: "rollup-plugin-jsxbin2",
    version: "1.1.3",
    async generateBundle(options: any, bundle: any) {
      const output = file.replace(".jsx", ".jsxbin");
      let jsxbinPath;
      if (jsxbin) {
        jsxbinPath = jsxbin;
      } else {
        const pluginPath = fileURLToPath(import.meta.url);
        const absolutePath = path.resolve(pluginPath);
        const projectPathRegex = /(.+?node_modules\\)/;
        const match = absolutePath.match(projectPathRegex);
        const node_modules_path = match ? match[1] : "";
        jsxbinPath = `${node_modules_path}/.bin/jsxbin`;
      }

      const cmd = `"${jsxbinPath}" -i "${file}" -o "${output}"`;

      await new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.error(`执行命令失败: ${error}`);
            reject(error);
            return;
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
            reject(stderr);
            return;
          }
          resolve(stdout);
        });
      });
    },
  };
}
