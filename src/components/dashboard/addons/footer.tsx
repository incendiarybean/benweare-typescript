import { IconProps } from "@lib/types";
import React from "react";

function Component({ Icon }: IconProps) {
    return (
        <div className="self-center">
            <footer className="animate__animated animate__fadeIn text-white border-b-2 border-blue-500 bg-gradient-to-r from-blue-700 to-blue-500 flex rounded-xl items-center p-2 justify-start shadow min-w-fit">
                <div className="px-2">
                    <Icon.Info />
                </div>
                <p className="mt-1 ml-2 pr-3"> Built by Benjamin Weare</p>
            </footer>
        </div>
    );
}

export default Component;
