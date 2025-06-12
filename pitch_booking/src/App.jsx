import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homepage";
import BookingPage from "./pages/bookingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
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
        </Routes>
      </GlobalContextProvider>
    </Router>
  );
}

export default App;
