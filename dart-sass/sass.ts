import { createRequire } from "https://deno.land/std@0.173.0/node/module.ts"

const require = createRequire(import.meta.url)
const sass = require("./package")
export default sass