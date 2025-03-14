import { useContext } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./components/Dashboard";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { token } = useContext(AuthContext);
  return (
    <Router>
      {!token ? (
        <Routes>
          <Route path="/" element={<AuthPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
