import React, { useState, useEffect } from "react";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
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
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify({
          firstName,
          lastName,
          displayName,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Handle successful signup, e.g., redirect to login page
        console.log("Signup successful!");
      } else {
        // Handle signup error, e.g., display error message
        const error = await response.json(); // Assuming the API returns error details in JSON
        setErrorMessage(
          "Signup failed: " + error.title + " !" || "Signup failed!"
        ); // Set the error message from the API response
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
      setErrorMessage(
        "An error occurred during login: ${error.title}. Please try again later."
      );
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      {errorMessage && (
        <div className="error-message">
          {errorMessage}
          <p></p>
        </div>
      )}{" "}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupPage;
