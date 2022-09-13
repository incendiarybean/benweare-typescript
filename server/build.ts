import { exec } from "child_process";
import os from "os";

console.log("Moving client files...");
if (os.type() === "Linux") {
    exec("mv build ./dist/app");
    exec("cp -r ./server/resources/audio ./dist/resources/audio", (error) => {
        console.log(error);
    });
} else if (os.type() === "Windows_NT") {
    exec("move build ./dist/app");
    exec("copy -r ./server/resources/audio ./dist/resources/audio", (error) => {
        if (error) {
            console.log(error);
        }
    });
}
