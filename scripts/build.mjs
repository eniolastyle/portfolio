import { build } from "esbuild";
import { copyFile, mkdir, rm } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const dist = new URL("../dist/", import.meta.url);

await rm(dist, { recursive: true, force: true });
await mkdir(new URL("assets/", dist), { recursive: true });
await mkdir(new URL("resume/", dist), { recursive: true });

await Promise.all([
  copyFile(new URL("index.html", root), new URL("index.html", dist)),
  copyFile(new URL("config.js", root), new URL("config.js", dist)),
  copyFile(new URL("styles.css", root), new URL("styles.css", dist)),
  copyFile(new URL("resume/Lawal-Abdullateef-A-Resume.pdf", root), new URL("resume/Lawal-Abdullateef-A-Resume.pdf", dist)),
]);

await build({
  entryPoints: [new URL("src/main.jsx", root).pathname],
  bundle: true,
  minify: true,
  sourcemap: true,
  target: ["es2020"],
  outfile: new URL("assets/app.js", dist).pathname,
  jsx: "automatic",
});
