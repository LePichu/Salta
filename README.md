<h1 align="center">
	Salta
</h1>
<p align="center">
	A Native, Blazingly Fast, and always up-to-date way of using Dart Sass in Deno. <br> <br>
	<a href="https://discord.gg/Nhvt7X84Hj">
		<img src="https://dcbadge.vercel.app/api/server/Nhvt7X84Hj">
	</a>	
	<a href="https://deno.land/x/salta">
		<img src="https://img.shields.io/badge/available%20on-deno.land/x-normal.svg?style=for-the-badge&logo=deno&color=blue">
	</a>
</p>

![The Salta Banner](./branding/salta_banner.png)

## Documentation
To get started, import `Salta` and its types from a registry like [deno.land/x](https://deno.land/x/salta) or use it directly from [GitHub](https://raw.githubusercontent.com/lukeed/salta/master/mod.ts).

```ts
import { Salta, Style } from "https://deno.land/x/salta/src/mod.ts"

const EXAMPLE = Salta.compile({
	file: "/path/to/file.scss",
	style: Style.EXPANDED, // or STYLE.COMPRESSED
	quiet: true
})

console.log(EXAMPLE)
```

Salta under the hood relies on the `sass` (`dart-sass`) binary, which is not provided by most packages managers on Linux or Winget on Windows. You can, however, use `./src/install.ts` to get a copy of said `sass` binary easily, or to update an existing one. It fetches from the official `dart-sass` repository and installs an "isolate" of it under the same folder as Deno.

As of `v0.2.0`, Salta can use the `dart-sass` compiled JS output to compile SCSS instead of the native "isolate", this also means Salta can now run on Deno Deploy. Please set the environment variable `SALTA_USE_ISOLATE` to a boolean to use the native "isolate" or the JS version. This was made possibly by [@oscarotero](https://github.com/oscarotero)'s efforts on [`@lumeland/sass`](https://www.npmjs.com/package/@lumeland/sass); we achieve this by vendoring that package and using it to compile SCSS.

```ts

## License
Salta is licensed under the MIT License. See [LICENSE](./LICENSE) for more information.
