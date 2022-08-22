function Component() {
    return (
        <div className="w-full h-64 flex flex-col justify-around items-center">
            <div className="w-full px-4 mb-2 p-2 items-center flex flex-col justify-around">
                <div className="text-white bg-gradient-to-r from-blue-700 to-blue-500 p-4 rounded-xl shadow-md">
                    <svg
                        strokeWidth="1.3"
                        height="24"
                        className="transform scale-150"
                        viewBox="0 0 21 21"
                        width="24"
                        xmlns="https:////www.w3.org/2000/svg"
                    >
                        <g fill="none" fillRule="evenodd">
                            <circle
                                cx="10.5"
                                cy="10.5"
                                r="8"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="m10.5 11.5v-5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="10.5"
                                cy="14.5"
                                fill="currentColor"
                                r="1"
                            />
                        </g>
                    </svg>
                </div>
                <div className="text-xs uppercase mt-4 p-1 px-6 rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md">
                    This feed has failed to load.
                </div>
            </div>
        </div>
    );
}
export default Component;
