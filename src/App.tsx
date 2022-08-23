import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar, Routes, Icon, Sidebar } from "./components";
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
                <div className="w-full flex flex-col md:flex-row text-center justify-center">
                    <Navbar
                        Icon={Icon}
                        setMobileMenu={setMobileMenu}
                        mobileMenu={mobileMenu}
                    />
                    <div
                        className={`w-full md:max-w-4xl transition-all duration-150 ${
                            mobileMenu ? "opacity-40" : "opacity-100"
                        }`}
                    >
                        <Routes Icon={Icon} mobileMenu={mobileMenu} />
                    </div>
                    <Sidebar />
                </div>
            </div>
        </Router>
    );
}

export default App;
