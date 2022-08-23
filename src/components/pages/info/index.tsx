import { IconProps } from "@lib/types";
import React, { useEffect, useState } from "react";
import profile_image from "../../../IMG/profile-sm.webp";

function Component({ Icon }: IconProps) {
    const [show, setShow] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);

    const Expand = () => {
        if (!show) {
            return <Icon.UpArrow />;
        }
        return <Icon.DownArrow />;
    };

    const preloadImage = () => {
        const img = new Image();
        img.src = profile_image;
        setLoaded(true);
    };

    useEffect(() => {
        preloadImage();
    }, []);

    return (
        <div className="select-none bg-gray-200 items-center flex flex-col w-full overflow-auto md:h-screen pb-20">
            {loaded && (
                <div className="animate__animated animate__fadeIn animate__faster px-2 md:px-6 my-3 w-full">
                    <div className="flex flex-col w-full min-w-fit lg:min-w-0 bg-white rounded-xl shadow-md p-10 mt-28 self-center">
                        <div className="flex justify-center items-center mb-5">
                            <img
                                className="min-w-fit -mt-32 rounded-full shadow-xl border-8 border-white"
                                src={profile_image}
                                alt="Ben Weare, Benjamin Weare's mugshot"
                                loading="eager"
                            />
                        </div>
                        <div className="">
                            <h1 className="text-center text-2xl text-slate-700 font-bold leading-normal mb-1">
                                Ben Weare
                            </h1>
                            <h2 className="text-center text-xs -mt-2 mb-2 text-blue-600 font-bold uppercase">
                                Gloucestershire, England
                            </h2>
                            <hr className="mb-2" />
                            <div className="">
                                <p className="text-center font-light leading-relaxed text-slate-600">
                                    I'm an aspiring Full-Stack Software
                                    Developer. I work mostly with NodeJS and
                                    Python with hosting using AWS
                                    infrastructure/Heroku.
                                </p>
                            </div>
                        </div>

                        <button
                            className="group hover:text-blue-500 mt-10"
                            onClick={() => setShow(!show)}
                        >
                            <hr className="z-0" />
                            <div className="group-hover:text-blue-500 flex justify-center">
                                <div className="z-10 -mt-3 bg-white min-w-fit px-2 text-xs uppercase flex flex-row items-center">
                                    <p>Languages &amp; Experience</p> <Expand />
                                </div>
                            </div>
                        </button>
                    </div>
                    <div
                        hidden={!show}
                        className="text-left w-full min-w-fit lg:min-w-0 bg-white rounded-xl shadow-xl overflow-auto h-96 self-center mt-4 mb-20 z-10"
                    >
                        <p className="z-0 sticky top-0 bg-white text-left pl-8 p-3 text-sm text-blue-600 font-bold uppercase border-b">
                            Services/Environments
                        </p>
                        <div className="w-full flex flex-col items-center overflow-hidden text-sm mb-4">
                            <a
                                href="https://www.docker.com/"
                                className="w-full border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                Docker
                            </a>

                            <a
                                href="https://aws.amazon.com/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                AWS CLI
                            </a>

                            <a
                                href="https://www.heroku.com/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                HEROKU CLI
                            </a>

                            <a
                                href="https://microk8s.io/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                MicroK8s
                            </a>

                            <a
                                href="https://kubernetes.io/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                Kubernetes
                            </a>

                            <a
                                href="https://nodejs.org/en/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                NodeJS
                            </a>
                        </div>
                        <p className="z-0 sticky top-0 bg-white w-full text-left pl-8 p-3 text-sm text-blue-600 font-bold uppercase border-t border-b">
                            Proficient Languages
                        </p>
                        <div className="w-full flex flex-col items-center overflow-hidden text-sm mb-4">
                            <a
                                href="https://www.typescriptlang.org/"
                                className="w-full border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                TYPESCRIPT/JAVASCRIPT
                            </a>

                            <a
                                href="https://www.python.org/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden"
                            >
                                PYTHON
                            </a>

                            <a
                                href="https://www.php.net/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden"
                            >
                                PHP
                            </a>
                        </div>

                        <p className="z-0 sticky top-0 bg-white w-full text-left pl-8 p-3 text-sm text-blue-600 font-bold uppercase border-t border-b">
                            Minor Language Experience
                        </p>
                        <div className="w-full flex flex-col items-center overflow-hidden text-sm mb-4">
                            <a
                                href="https://docs.microsoft.com/en-us/cpp/?view=msvc-170"
                                className="w-full border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                C++
                            </a>

                            <a
                                href="https://docs.microsoft.com/en-us/dotnet/csharp/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden"
                            >
                                C#
                            </a>

                            <a
                                href="https://www.rust-lang.org/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden "
                            >
                                Rust
                            </a>
                        </div>

                        <p className="z-0 sticky top-0 bg-white w-full text-left pl-8 p-3 text-sm text-blue-600 font-bold uppercase border-t border-b">
                            Databases
                        </p>
                        <div className="w-full flex flex-col items-center overflow-hidden text-sm mb-4">
                            <a
                                href="https://www.mysql.com/"
                                className="w-full border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                MySQL
                            </a>

                            <a
                                href="https://aws.amazon.com/dynamodb/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden"
                            >
                                DynamoDB
                            </a>

                            <a
                                href="https://www.mongodb.com/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden "
                            >
                                MongoDB
                            </a>
                        </div>

                        <p className="z-0 sticky top-0 bg-white w-full text-left pl-8 p-3 text-sm text-blue-600 font-bold uppercase border-t border-b">
                            JS Frameworks
                        </p>
                        <div className="w-full flex flex-col items-center overflow-hidden text-sm mb-4">
                            <a
                                href="https://www.npmjs.com/package/express"
                                className="w-full border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150"
                            >
                                Express
                            </a>

                            <a
                                href="https://reactjs.org/"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden"
                            >
                                React (Functional)
                            </a>

                            <a
                                href="https://www.npmjs.com/package/tailwindcss"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden "
                            >
                                Tailwind
                            </a>

                            <a
                                href="https://www.npmjs.com/package/passport"
                                className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden "
                            >
                                Passport
                            </a>

                            <p className="w-full border-t border-gray-100 text-gray-600 py-2 pl-10 pr-3 block hover:bg-gray-100 transition duration-150 overflow-hidden">
                                Plus more!
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Component;
