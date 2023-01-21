export enum Style {
	COMPRESSED = "compressed",
	EXPANDED = "expanded"
}

export interface Options {
	file: string,
	style?: Style,
	sourcemap?: boolean,
	quiet?: boolean
}

function flagBuilder(opt: Options) {
	const flags: string[] = []

	flags.push(opt.file.replace("file:///", ""))
	if (opt.style) flags.push(`--style=${opt.style}`)
	if (opt.sourcemap) flags.push("--embed-source-map")
	if (opt.quiet) flags.push("--quiet")

	return flags
}


// This is a class for now, as we plan to add more functions to it in the future.
export class Salta {
	/** `Salta.Compile(opt: Options)` compiles a Sass file to CSS.
	*	@param opt Options for the compiler.
	*/
	static compile(opt: Options) {
		let PROC: Deno.Command 

		if(Deno.build.os !== "windows") {
			PROC = new Deno.Command("sass", {
				args: [
					...flagBuilder(opt),
					"--color", 
					"--error-css"
				],
				stdout: "piped",
				stderr: "piped"
			})
		} else {
			PROC = new Deno.Command("powershell", {
				args: [
					"-NoProfile",
					"-NoLogo",
					`sass ${flagBuilder(opt).join(" ")} --color --error-css`
				],
				stdout: "piped",
				stderr: "piped"
			})
		}

		try { PROC.spawn() } catch { throw new Deno.errors.NotFound("Sass not found!") }

		if (PROC.outputSync().stderr.length > 0) {
			const errMsg = new TextDecoder().decode(PROC.outputSync().stderr).trim()
			const err = new Error(
				"\r                                        " 
				+ "\n" 
				+ errMsg
			)
			err.stack = undefined
			throw err
		}
	
		return new TextDecoder().decode(PROC.outputSync().stdout).trim()
	}
}