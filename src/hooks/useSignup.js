import React, { useState } from "react";
import { auth } from "../firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";

//component
export const useSignup = () => {
  //Hook State
  // if an error happend
  const [error, setError] = useState(null);
  // when we are pending for the result
  const [isPending, setIsPending] = useState(false);

  //Redux
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  //
  const signup = async (displayName, email, password) => {
    setError(null);
    setIsPending(true);

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response.user);

      if (!response) {
        throw new Error("could not complete signup");
      }
      // Update the DisplayNam of the User
      await updateProfile(auth.currentUser, {
        displayName,
      });
      dispatch(loginUser(JSON.stringify(response.user)));
      // if (!canceled) {
      setIsPending(false);
      setError(null);
    } catch (error) {
      console.log(error.message);
      // if (!canceled) {
      setError(error.message);
      setIsPending(false);
    }
  };

  // if u face is error
  // can't perform a react state update on an unmounted component...
  // this clean up function so if the page get unmounted
  // no state will be changed
  //  // if the operation get canceld
  //const [canceled, setCanceled] = useState(false);

  // React.useEffect(() => {
  //   return () => {
  //     setCanceled(true);
  //   };
  // }, []);

  return { error, isPending, signup };
};
export default useSignup