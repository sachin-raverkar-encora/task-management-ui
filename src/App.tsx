import { useState } from "react";
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

function App() {
  const [showSignup, setShowSignup] = useState(false);

  const handleToggleForm = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="app-container">
      <div className="form-container">
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
            {showSignup ? <SignupPage /> : <LoginPage />}
            <button onClick={handleToggleForm} style={{ marginTop: "10px" }}>
              {showSignup
                ? "Already have an account? Login"
                : "Don't have an account? Signup"}
            </button>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default App;
