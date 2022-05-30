import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import ViewResume from "./components/ViewResume";
import PortfolioContextProvider from "./store/PortfolioContext";
import LoginPage from "./pages/LoginPage";
import { AuthContextProvider } from "./store/AuthContext";

function App() {
  return (
    <PortfolioContextProvider>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/view-resume" element={<ViewResume />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AuthContextProvider>
    </PortfolioContextProvider>
  );
}

export default App;
