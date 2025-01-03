import { exec as e } from "child_process";
import o from "fs";
import r from "path";
import { fileURLToPath as s } from "url";
function i(i) {
  const { input: t, jsxbin: n } = i;
  return {
    name: "rollup-plugin-jsxbin2",
    version: "1.1.0",
    async generateBundle(i, l) {
      const a = t.replace(".jsx", ".jsxbin");
      let m;
      if (n) m = n;
      else {
        const e = s(import.meta.url),
          o = /(.+?node_modules\\)/,
          i = r.resolve(e).match(o);
        m = `${i ? i[1] : ""}/.bin/jsxbin`;
      }
      const c = `"${m}" -i "${t}" -o "${a}"`;
      await new Promise((o, r) => {
        e(c, (e, s, i) => (e ? (console.error(`执行命令失败: ${e}`), void r(e)) : i ? (console.error(`stderr: ${i}`), void r(i)) : void o(s)));
      });
      const p = o.readFileSync(a);
      this.emitFile({ type: "asset", fileName: r.parse(a).base, source: p });
    },
  };
}
export { i as default };
//# sourceMappingURL=index.js.map
