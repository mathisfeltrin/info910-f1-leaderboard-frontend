import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import DriversListPage from "./pages/DriversListPage";
import DriverDetailsPage from "./pages/DriverDetailsPage";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drivers" element={<DriversListPage />} />
        <Route path="/drivers/:driverName" element={<DriverDetailsPage />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}
