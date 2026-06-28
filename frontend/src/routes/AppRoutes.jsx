import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import EditJob from "../pages/EditJob";

function AppRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/jobs/:id"
                element={<JobDetails />}
            />

            <Route
                path="/jobs/:id/edit"
                element={<EditJob />}
            />
        </Routes>
    );
}

export default AppRoutes;