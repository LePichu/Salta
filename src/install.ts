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
                "-c"
            ]
        }
    }

    return [ shell, args ]
}

const [ shell, args ] = cmdData()
const installer = Deno.build.os === "windows" ? "./installers/windows.ps1" : "./installers/unix.sh"

const path = Deno.makeTempDirSync()
Deno.writeTextFileSync(`${path}/install.ps1`, `${await fetch(import.meta.resolve(installer).toString()).then(x => x.text())}`)

new Deno.Command(shell() as string, {
    args: [
        ...args(),
        `${path}/install.ps1`        
    ],
    env: {
        "ARCH": Deno.build.arch === "x86_64" ? "x64" : "arm64",
        "OS": Deno.build.os === "darwin" ? "macos" : "linux",
        "SASS_VER": "1.57.0",
        "DL_PATH": Deno.execPath().replace("deno.exe", "dart-sass.zip"),
        "INS_PATH": Deno.execPath().replace("deno.exe", "")
    },
    stdout: "inherit"
}).spawn()

