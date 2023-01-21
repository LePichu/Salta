function cmdData() {
    const shell = (): string => {
        switch(Deno.build.os) {
            case "windows": return "powershell"
            case "darwin": return "zsh"
            case "linux": return "bash"
        }
    }

    const args = (): string[] => {
        switch (Deno.build.os) {
            case "windows": return [
                "-NoProfile",
                "-NoLogo"
            ]
            case "darwin": return [
                "-c"
            ]
            case "linux": return [
                "-x"
            ]
        }
    }

    return [ shell, args ]
}

const [ shell, args ] = cmdData()
const installer = Deno.build.os === "windows" ? "./installers/windows.ps1" : "./installers/unix.sh"

const path = Deno.makeTempDirSync()
Deno.writeTextFileSync(`${path}/install.ps1`, `${await fetch(import.meta.resolve(installer).toString()).then(x => x.text())}`)
const sudo = Deno.build.os !== "windows" ? "" : ""

new Deno.Command(shell() as string, {
    args: [
        ...args(),
        `${sudo}${path}/install.ps1`
    ],
    env: {
        "ARCH": Deno.build.arch === "x86_64" ? "x64" : "arm64",
        "OS": Deno.build.os === "darwin" ? "macos" : "linux",
        "EXT": Deno.build.os === "windows" ? "zip" : "tar.gz",
        "SASS_VER": "1.57.0",
        "DL_PATH": Deno.execPath().replace(Deno.build.os === "windows" ? "/deno.exe" : "/deno", `/dart-sass.${Deno.build.os === "windows" ? "zip" : "tar.gz"}`),
        "INS_PATH": Deno.execPath().replace(Deno.build.os === "windows" ? "/deno.exe" : "/deno", "")
    },
    stdout: "inherit"
}).spawn()

