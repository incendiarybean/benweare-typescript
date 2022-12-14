import { BodyProps } from "@lib/types";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Info from "../pages/info";

function Component(props: BodyProps) {
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard {...props} />} />
            <Route path="*" element={<Info {...props} />} />
        </Routes>
    );
}

export default Component;
