import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { error, isPending, signup } = useSignup();
  const handleSubmit = (e) => {
    e.preventDefault();
    signup(displayName, email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={"signup-form"}>
      <h2>sign up</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>display name:</span>
        <input
          type="text"
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {!isPending ? (
        <button className="btn">sign Up</button>
      ) : (
        <button className="btn" disabled>
          ...
        </button>
      )}
      {error && <p>{error}</p>}
    </form>
  );
}

export default Signup;
