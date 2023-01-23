import { Salta, Style } from "../src/mod.ts"
import { brightBlue, brightMagenta, bold } from "https://deno.land/std@0.173.0/fmt/colors.ts"

console.log(`${bold("----\nDebug Info:")} IS_DEPLOY=${Deno.env.get("DENO_REGION") !== undefined} USE_ISOLATE=${Deno.env.get("SALTA_USE_ISOLATE") ?? "false"}`)

console.log(`${bold("Running Example:")} ${Deno.args[0]}\n${bold("----")}`)

const
	PATH = `${Deno.cwd()}/examples/${Deno.args[0]}`,
	STYLE = Deno.args[1] === "c" ? Style.COMPRESSED : Style.EXPANDED,
	EXAMPLE = Salta.compile({
		file: PATH,
		style: STYLE,
		quiet: true,
		// Do this to distinguish between isolate and JS library versions.
		sourcemap: Deno.env.get("SALTA_USE_ISOLATE") === "true"
	})

console.log(
	`${brightMagenta("Input:")}\n${Deno.readTextFileSync(PATH)}\n\n${brightBlue("Output:")}\n${EXAMPLE}`.trim()
)