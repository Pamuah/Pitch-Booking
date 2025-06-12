import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homepage";
import BookingPage from "./pages/bookingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import MainAdminPage from "./pages/mainadminpage";
import ManagePitches from "./pages/ManagePitches";
import BookingsPage from "./pages/BookingsPage";
import ReviewsPage from "./pages/ReviewsPage";
import SettingsPage from "./pages/SettingsPage";

import { GlobalContextProvider } from "./context/global_context";

function App() {
  return (
    <Router>
      <GlobalContextProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/landingPage" element={<LandingPage />} />
          <Route path="/bookingPage" element={<BookingPage />} />
          <Route path="/adminlogin" element={<AdminLoginPage />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/mainadmin" element={<MainAdminPage />} />
          <Route path="/admin/pitches" element={<ManagePitches />} />
          <Route path="/admin/bookings" element={<BookingsPage />} />
          <Route path="/admin/reviews" element={<ReviewsPage />} />
          <Route path="/admin/settings" element={<SettingsPage />} />
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;