import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "./pages/Login";

import AdminDashboard
from "./pages/AdminDashboard";

import HeadDashboard
from "./pages/HeadDashboard";

import EngineerDashboard
from "./pages/EngineerDashboard";

import RequestDashboard
from "./pages/RequestDashboard";

import ReportPage
from "./pages/ReportPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/admin"
          element={
            <AdminDashboard />
          }
        />

        <Route
          path="/head"
          element={
            <HeadDashboard />
          }
        />

        <Route
          path="/engineer"
          element={
            <EngineerDashboard />
          }
        />

        <Route
          path="/requests"
          element={
            <RequestDashboard />
          }
        />

        <Route
          path="/report/:id"
          element={
            <ReportPage />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;