import { useState } from "react";
import { supabase } from "../supabaseClient"; // adjust import to your setup

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("Logged in:", data.user);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    console.log("Signed out");
  };

  return (
    <div className="login-form">
      <h2>Stakeholder Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleLogout}>Sign Out</button>
    </div>
  );
}
