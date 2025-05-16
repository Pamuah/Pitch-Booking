import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homepage";
import BookingPage from "./pages/bookingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="/bookingPage" element={<BookingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
