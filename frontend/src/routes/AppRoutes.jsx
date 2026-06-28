import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            <Route
                path="/jobs/:id"
                element={<JobDetails />}
            />
        </Routes>
    );
}

export default AppRoutes;