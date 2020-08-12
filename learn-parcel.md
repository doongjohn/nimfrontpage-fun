# Parcel.js

Parcel is easy to use 0 config bundler. But it has some limitations. For example you cant load scss variables to js.

## Notes

Every thing lives inside the src folder.

You can load css by `import 'css/path'` in js or by `<link rel="stylesheet" href="css/path" />` in html.

script tag can't have `defer` or `type="module"` attribute.
(technically it can but live reload will not work.)

Remove main field in package.json to build.
https://github.com/parcel-bundler/parcel/issues/3442#issuecomment-559990105

## Reference

[Official Doc v2 (incomplete)](https://v2.parceljs.org)
[Official Doc](https://parceljs.org/getting_started.html)
