import React, { useState } from "react";
import { auth } from "../firebase.config";
import { signOut } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/authSlice"

export const useLogout = () => {
  //Hook State
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  //Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  // func

  const logout = async () => { 
  // set The state 
    setError(null);
    setIsPending(true);

    try {
    // using signOut function to logout the user 
      await signOut(auth);
      // remove the user from our global State
      dispatch(logoutUser())
      //reset the State
      setError(null);
      setIsPending(false);
      //if something wrong happend 
    } catch (error) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };
  
  return {logout, error, isPending}
};
export default useLogout