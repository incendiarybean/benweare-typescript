import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Routes, Icon } from "./components";
import "animate.css";

function App() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);

    useEffect(() => {
        toast("👋 Welcome!", { position: "bottom-left" });
    }, []);

    return (
        <Router>
            <div className="">
                <ToastContainer />
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 auto-cols-min text-center">
                    <Navbar
                        Icon={Icon}
                        setMobileMenu={setMobileMenu}
                        mobileMenu={mobileMenu}
                    />
                    <div
                        className={`md:col-span-2 xl:col-span-1 min-w-fit w-full transition-all duration-150 ${
                            mobileMenu ? "opacity-40" : "opacity-100"
                        }`}
                    >
                        <Routes Icon={Icon} mobileMenu={mobileMenu} />
                    </div>
                    <div className="md:hidden w-56 mt-12 divide-y divide-slate-300"></div>
                </div>
            </div>
        </Router>
    );
}

export default App;
