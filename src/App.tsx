import { useState } from "react";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TasksDashboard from "./components/TasksDashboard";
import "./App.css";

const App: React.FC = () => {
  //   const [showSignup, setShowSignup] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  //   const handleToggleForm = () => {
  //     setShowSignup(!showSignup);
  //   };

  return (
    <BrowserRouter>
      <div className="app-container">
        <div className="form-container">
          <Routes>
            <Route
              path="/login"
              element={
                isAuthenticated ? (
                  <Navigate to="/tasks" />
                ) : (
                  <LoginPage onLogin={handleLogin} />
                )
              }
            />
            <Route
              path="/tasks"
              element={
                isAuthenticated ? <TasksDashboard /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/"
              element={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                  }}
                >
                  <div>
                    {" "}
                    {/* Container for login/signup forms */}
                    <SignupPage />
                    <button
                      onClick={() => {
                        window.location.href = "/login";
                      }}
                      style={{ marginTop: "10px" }}
                    >
                      Already have an account? Login
                    </button>
                  </div>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
