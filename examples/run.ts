import { Salta, Style } from "../src/mod.ts"
import { brightBlue, brightMagenta, bold } from "https://deno.land/std@0.173.0/fmt/colors.ts"

console.log(`${bold("Running Example: ")}${Deno.args[0]}\n${bold("----")}`)

const
	PATH = `${import.meta.resolve(`./${Deno.args[0]}`)}`,
	STYLE = Deno.args[1] === "c" ? Style.COMPRESSED : Style.EXPANDED,
	EXAMPLE = Salta.compile({
		file: PATH,
		style: STYLE,
		quiet: true
	})

console.log(
	`${brightMagenta("Input:")}\n${await fetch(PATH).then(x => x.text())}\n\n${brightBlue("Output:")}\n${EXAMPLE}`.trim()
)