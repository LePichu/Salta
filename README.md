# Salta
A Native, Blazingly Fast, and always up-to-date way of using Dart Sass in Deno.

![The Salta Banner](./branding/salta_banner.png)

## Documentation
To get started, import `salta` from a registry like [deno.land/x](https://deno.land/x/salta) or use it directly from [GitHub](https://raw.githubusercontent.com/lukeed/salta/master/mod.ts).

```ts
import { Salta, Style } from "https://deno.land/x/salta/mod.ts"

const EXAMPLE = Salta.compile({
	file: "/path/to/file.scss",
	style: Style.EXPANDED, // or STYLE.COMPRESSED
	quiet: true
})

console.log(EXAMPLE)
```

## License
Salta is licensed under the MIT License. See [LICENSE](./LICENSE) for more information.