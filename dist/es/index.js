import { spawn, exec } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export default function jsxbin2(options = {}) {
    const { file, jsxbin } = options;

    return {
        name: "rollup-plugin-jsxbin2",
        version: "1.0.9",
        async generateBundle(outputOptions, bundle) {
            const output = file.replace(".jsx", ".jsxbin");
            var jsxbinPath;
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
            const source = fs.readFileSync(output);
            this.emitFile({ type: "asset", fileName: path.parse(output).base, source: source });
        },
    };
}
