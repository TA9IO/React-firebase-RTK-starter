import { useState,useEffect, useLayoutEffect  } from "react";
import { collection, query, where, onSnapshot , orderBy} from "firebase/firestore";
import { db } from "../firebase.config";

export const useCollection = (col, userQuery) => { //:')
  //state
  const [docs, setDocs] = useState([]);
  const [erorr, setErorr] = useState(false);
  //firebase Refs
  const colRef = collection(db, col);

  const q = query(colRef, where(...userQuery), orderBy("timestamp", "desc"));
 
  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({...doc.data(), key: doc.id});
      });
      //update The State:
      setDocs(data);
      setErorr(false)
      
    }, (err) => {
      // console.log(err)
      setErorr(err.message)
    });
    return () => {
      unsubscribe()
    }
  }, [col, ...userQuery])
  
  // console.log("data: ", docs);
  return {docs, erorr}
  
  
};
export default useCollection;
