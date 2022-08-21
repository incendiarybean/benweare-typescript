const exec = require("child_process").exec;
const os = require("os");

console.log("Moving client files...");
if (os.type() === "Linux") {
    exec("mv build ./dist/app");
} else if (os.type() === "Windows_NT") {
    exec("move build ./dist/app");
}

if (process.env.NODE_ENV === undefined) {
    console.log("Installing Production Deps...");
    exec("npm install --production");
    process.env.NODE_ENV = "production";
}
