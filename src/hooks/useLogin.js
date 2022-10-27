import React, { useState } from "react";
import { auth } from "../firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";

const useLogin = () => {
  //Hook State
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // func

  const login = async (email, password) => {
    // set The state
    setError(null);
    setIsPending(true);

    try {
      // using signOut function to logout the user
      const response = await signInWithEmailAndPassword(auth, email, password);
      // remove the user from our global State
      dispatch(loginUser(JSON.stringify(response.user)));
      //reset the State
      setError(null);
      setIsPending(false);
      //if something wrong happend
    } catch (error) {
      console.log(error);
      setError(error.message);
      setIsPending(false);
    }
  };

  return { login, error, isPending };
};
export default useLogin