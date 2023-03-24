import { spawn } from 'child_process';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export default function jsxbin2(options = {}) {
    const { file } = options;

    return {
        name: 'rollup-plugin-jsxbin2',
        version: '0.0.1',
        async generateBundle(outputOptions, bundle) {
            const output = file.replace('.jsx', '.jsxbin');
            const cmd = `jsxbin -i ${file} -o ${output}`;

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
            this.emitFile({ type: 'asset', fileName: path.parse(output).base, source: source });
        },
    };
}
