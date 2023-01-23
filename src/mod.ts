import sass from "../dart-sass/sass.ts"

// Environment Variables
const
	USE_ISOLATE = Deno.env.get("SALTA_USE_ISOLATE") ? true : false,
	IS_DEPLOY = Deno.env.get("DENO_REGION") !== undefined

/** Enum for setting the type of SCSS output to get, the fields are self-explanatory. */
export enum Style {
	/** Equivalent to `--style="compressed"` */
	COMPRESSED = "compressed",
	/** Equivalent to `--style="expanded"` */
	EXPANDED = "expanded"
}

/** Options for the compiler, this allow you to mold the output however you like. Equivalent to the Command Line options in Dart-Sass. */
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
/**
 * `Salta` is the main class for the module, it contains all the functions for the compiler.
 */
export class Salta {
	/** `Salta.Compile(opt: Options)` compiles a Sass file to CSS.
	*	@param opt Options for the compiler.
	*/
	static compile(opt: Options): string {
		if(USE_ISOLATE || IS_DEPLOY) {
			// @ts-ignore ""
			const ret = sass.compile(opt.file, {
				sourceMap: opt.sourcemap,
				sourceMapIncludeSources: opt.sourcemap,
				style: opt.style
			})
			// TODO(LePichu); Add sourceMap support; this does not work at all.
			return `${ret.css}\n/*# sourceMappingURL=data:application/json;base64, */`
		}

		return this.compileWithIsolate(opt)
	}

	private static compileWithIsolate(opt: Options): string {
		let PROC: Deno.Command

		if (Deno.build.os !== "windows") {
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