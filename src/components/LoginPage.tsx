import React, { useState, useEffect } from "react";

interface LoginPageProps {
  onLogin: () => void;
}

function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const hostUrl = import.meta.env.VITE_HOST_URL;
  const apiUrl = import.meta.env.VITE_API_URL;
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to store error messages
  useEffect(() => {
    const fetchCsrfToken = async () => {
      const response = await fetch(`${hostUrl}/csrf`);
      const data = await response.json(); // Or response.text() if returning plain text
      setCsrfToken(data.csrfToken);
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login, e.g., redirect to dashboard
        setErrorMessage("Login successful!");
        console.log("Login successful!");
        // Call the onLogin function passed from App component
        onLogin();
      } else {
        // Handle login error, e.g., display error message
        const error = await response.json(); // Assuming the API returns error details in JSON
        setErrorMessage(
          "Login failed: " + error.title + " !" || "Login failed!"
        ); // Set the error message from the API response
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage(
        "An error occurred during login: ${error.title}. Please try again later."
      ); // Set a generic error message for network issues, etc.
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <p></p>
        </div>
      )}{" "}
      {/* Display error message if it exists */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
