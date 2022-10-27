import {
  collection,
  addDoc,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useReducer, useState, useEffect } from "react";
import { db } from "../firebase.config";

// initial state of the app
let initialState = {
  document: null,
  isPending: "false",
  error: null,
  success: null,
};

// set the state in deferent state app (pending, error, sucess...)
// using the useRedducer Hook
// if you dont like useReducer u can rewrite every thing in useState no probleme...
const fireStoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { success: false, isPending: true, error: null, document: null };
    case "ERROR":
      return {
        success: false,
        isPending: false,
        error: action.payload,
        document: null,
      };
    case "ADDED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        success: true,
        isPending: false,
        error: null,
        document: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [state, dispatch] = useReducer(fireStoreReducer, initialState);
  // in case the call is cancelled ( component unmounted..etc)
  const [isCanceled, setIsCanceled] = useState(false);
  // only dispach if not canceled
  // we dont want to change the state if the component umounted :)
  function dispatchIfNotCanceled(action) {
    if (!isCanceled) {
      dispatch(action);
    }
  }
  /**************************
   **************************
   ***** add the doc ********
   **************************
   **************************/
  const addDocument = async (doc) => {
    //first we setPending to true
    dispatch({ type: "IS_PENDING" });
    // now we start adding the doc
    try {
      // addDoc
      // db === our fireStore database;
      // col === the collection where we want to add the document we pass it as an argument to the hook
      // ...doc, createdAt === what Document we want to add! we spread the doc data and add the date if u dont need the date just add (doc)

      const docRef = await addDoc(collection(db, col), {
        ...doc,
        timestamp: serverTimestamp(),
      });
      // reset the state after the doc is added and we use 'dispatchIfNotCanceled' to make sure the component still exist (we dont want to change the state of an unmounted component :)
      // dispatchIfNotCanceled({ type: "ADDED_DOCUMENT", payload: docRef });
      dispatch({ type: "ADDED_DOCUMENT", payload: docRef });
    } catch (error) {
      // if an err happend :)
      dispatchIfNotCanceled({ type: "ERROR", payload: error.message });
    }
  };
  /**************************
   **************************
   ***** Remove the doc ********
   **************************
   **************************/

  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      await deleteDoc(doc(db, col, id));
      dispatchIfNotCanceled({ type: "DELETED_DOCUMENT" });
    } catch (error) {
      dispatchIfNotCanceled({ type: "ERROR", payload: "could not delete" });
    }
  };
  useEffect(() => {
    return () => setIsCanceled(true);
  }, []);
  return { addDocument, deleteDocument, state };
};
export default useFirestore;
