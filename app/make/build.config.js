const buildConfig = {
  bundle: {
    in: ["app/sass/daldointro.scss", "app/sass/daldo.scss", "app/src/intro.ts", "app/src/app.tsx"],
    out: ["public/css/intro.css", "public/css/daldo.css", "public/js/dgp.js", "public/js/daldo.js"]
  },
  css: {
    entryPoints: [],
    bundle: true,
    outfile: "",
    minify: true,
    sourcemap: false,
    assetNames: "assets/[name]-[hash]",
    loader: {
      ".svg": "file", // make image file use file-loader
      ".jpg": "file",
      ".png": "file",
      ".woff": "file",
      ".ttf": "file",
      ".otf": "file"
    },
    plugins: []
  },
  js: {
    entryPoints: [],
    bundle: true,
    outfile: "",
    define: {},
    publicPath: "/js/",
    minify: true,
    sourcemap: false,
    assetNames: "assets/[name]-[hash]",
    loader: {
      ".svg": "file" // make image file use file-loader
    },
    target: "es2015"
  }
};

module.exports = buildConfig;
