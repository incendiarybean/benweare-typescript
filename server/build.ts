import { exec } from "child_process";
import os from "os";

console.log("Moving client files...");
if (os.type() === "Linux") {
    exec("mv build ./dist/app");
} else if (os.type() === "Windows_NT") {
    exec("move build ./dist/app");
}
