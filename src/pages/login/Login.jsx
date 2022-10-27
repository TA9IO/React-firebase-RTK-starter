import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLogin } from "../../hooks";
function Login() {
  //page State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useLogin hook
  const { login, error, isPending } = useLogin();

  // func
  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={"login-form"}>
      <h2>login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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

export default Login;
