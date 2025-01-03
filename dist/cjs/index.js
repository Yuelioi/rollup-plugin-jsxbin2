"use strict";
var e = require("child_process"),
  r = require("fs"),
  n = require("path"),
  i = require("url"),
  o = "undefined" != typeof document ? document.currentScript : null;
module.exports = function (s) {
  const { input: t, jsxbin: u } = s;
  return {
    name: "rollup-plugin-jsxbin2",
    version: "1.1.0",
    async generateBundle(s, c) {
      const l = t.replace(".jsx", ".jsxbin");
      let a;
      if (u) a = u;
      else {
        const e = i.fileURLToPath(
            "undefined" == typeof document
              ? require("url").pathToFileURL(__filename).href
              : (o && "SCRIPT" === o.tagName.toUpperCase() && o.src) || new URL("index.js", document.baseURI).href
          ),
          r = /(.+?node_modules\\)/,
          s = n.resolve(e).match(r);
        a = `${s ? s[1] : ""}/.bin/jsxbin`;
      }
      const d = `"${a}" -i "${t}" -o "${l}"`;
      await new Promise((r, n) => {
        e.exec(d, (e, i, o) => (e ? (console.error(`执行命令失败: ${e}`), void n(e)) : o ? (console.error(`stderr: ${o}`), void n(o)) : void r(i)));
      });
      const p = r.readFileSync(l);
      this.emitFile({ type: "asset", fileName: n.parse(l).base, source: p });
    },
  };
};
//# sourceMappingURL=index.js.map
