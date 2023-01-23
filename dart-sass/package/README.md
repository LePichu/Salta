This is a slightly modified version of the [sass package](https://www.npmjs.com/package/sass) to make it work on Deno.

## Changes from the NPM version

- Modified `package.json`.
- Removed `bin` file.
- Removed `chokidar` dependency (used only in `bin`).
- Detect Deno in `sass.dart.js` with:
  ```js
  var dartNodeIsActuallyNode = !dartNodePreambleSelf.window || dartNodePreambleSelf.window.Deno;
  ```

This package will be obsolete when https://github.com/mbullington/node_preamble.dart/pull/32 is merged (or [dart-sass fixed this issue](https://github.com/sass/dart-sass/issues/1834) in a different way).
