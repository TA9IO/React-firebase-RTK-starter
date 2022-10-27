import { useState, useEffect } from "react";
import { Home, Login, Signup } from "./pages";
import { Navbar, Loader } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
import { authIsReady } from "./features/authSlice";
// import your route components too
function App() {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth.authState);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authIsReady(JSON.stringify(user)));
      } else {
        dispatch(authIsReady(JSON.stringify(user)));
      }
    });
    return unsubscribe;
  }, []);

  return !authState ? (
    <Loader></Loader>
  ) : (
    <div className="App">
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
        
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/home"
            element={user ? <Home /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/Home" replace />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/Home" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
