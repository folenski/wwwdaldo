/**
 * Generate the development bundle for JavaScript and CSS files for the site.
 */

const esbuild = require("esbuild");
const sass = require("esbuild-sass-plugin");
const path = require("path");
const watch = require("node-watch");
const buildConfig = require("./build.config.js");

const rootPath = path.resolve(__dirname, "../..") + "/";
let mode = "development";

if (process.argv.length === 3) {
  if (process.argv[2] === "production") mode = "production";
}

console.log("Esbuild mode:", mode);

if (buildConfig.bundle.in.length !== buildConfig.bundle.out.length) {
  console.error("bundle.in is not the same bundle.out");
  return -1;
}

const builderParams = [];
let objCopy = {};
buildConfig.bundle.in.forEach((el, index) => {
  const outFile = rootPath + buildConfig.bundle.out[index];
  const pattern = path.extname(outFile);

  switch (pattern) {
    case ".js":
      objCopy = JSON.parse(JSON.stringify(buildConfig.js)); // deep copy
      if (objCopy.define) {
        objCopy.define["process.env.NODE_ENV"] = JSON.stringify(mode);
      }
      if (mode !== "production") {
        objCopy.minify = false;
        objCopy.sourcemap = true;
      }
      break;
    case ".css":
      objCopy = JSON.parse(JSON.stringify(buildConfig.css)); // deep copy
      if (objCopy.plugins) {
        objCopy.plugins.push(
          sass.sassPlugin({
            type: "css",
            filter: /.(s[ac]ss|css)$/
          })
        );
      }
      break;
    default:
      console.error("Unknown pattern", pattern);
      return -1;
  }
  objCopy.entryPoints.push(rootPath + el);
  objCopy.outfile = outFile;
  builderParams.push(objCopy);
});

const run = async (start) => {
  for (let index = 0; index < builderParams.length; index++) {
    console.log("Building", builderParams[index].outfile);
    await esbuild.build(builderParams[index]);
  }
  console.log("Finished build in", new Date().getTime() - start, "ms");
};

if (mode !== "production") { // watch mode
  run(new Date().getTime());
  watch(
    rootPath + "app/",
    {
      recursive: true // listens for changes in subdirectory as well
    },
    async () => {
      const start = new Date().getTime();
      run(start);
    }
  );
} else {
  run(new Date().getTime());
}
