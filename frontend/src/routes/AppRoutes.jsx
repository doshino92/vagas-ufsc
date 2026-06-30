import { Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import EditAccount from "../pages/EditAccount";
import JobDetails from "../pages/JobDetails";
import CreateJob from "../pages/CreateJob";
import EditJob from "../pages/EditJob";
import MyApplications from "../pages/MyApplications";
import JobApplications from "../pages/JobApplications";
import Notifications from "../pages/Notifications";

function AppRoutes() {
    return (
        <Routes>
            {/* Públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protegidas */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/account"
                element={
                    <ProtectedRoute>
                        <EditAccount />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobs/:id"
                element={
                    <ProtectedRoute>
                        <JobDetails />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobs/new"
                element={
                    <ProtectedRoute>
                        <CreateJob />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobs/:id/edit"
                element={
                    <ProtectedRoute>
                        <EditJob />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/my-applications"
                element={
                    <ProtectedRoute>
                        <MyApplications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/jobs/:id/applications"
                element={
                    <ProtectedRoute>
                        <JobApplications />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/notifications"
                element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default AppRoutes;