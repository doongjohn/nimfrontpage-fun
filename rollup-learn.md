# Rollup.js Learn

By default Rollup is very minimal compare to Parcel.  
But it can be very powerful by using plugins.

## Notes

When importing a js, css, etc... don't forget to **put leading "./"** or it won't do anything.

## Rollup.js Reference

- [Local Install](https://rollupjs.org/guide/en/#installing-rollup-locally)
- [CLI flags](https://rollupjs.org/guide/en/#command-line-flags)

## Plugins

[Official Plugins](https://github.com/rollup/plugins)

- [SCSS, SASS](https://github.com/thgh/rollup-plugin-scss)  
  Compile SCSS/SASS using [node-sass](https://www.npmjs.com/package/node-sass) by default.

- [URL](https://github.com/rollup/plugins/tree/master/packages/url)  
  Can be used to include assets in js. [link](https://github.com/rollup/rollup/issues/1309)

- [BrowserSync](https://github.com/4lejandrito/rollup-plugin-browsersync)  
  Serves and auto reloads browser. (default port: 3001)  
  However can be replaced with VS Code Live Reload extension.

- [Terser](https://github.com/TrySound/rollup-plugin-terser)  
  Minifies generated es bundle.

- []()
