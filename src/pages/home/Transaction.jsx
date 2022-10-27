import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";
export default function Transaction({ user, id }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const { addDocument, state, deleteDocument } = useFirestore("transactions");

  const handleSubmit = async (e) => {
    e.preventDefault();

    addDocument({
      name,
      amount,
      uid: id,
    });
  };
  useEffect(() => {
    if (state.success) {
      setName("");
      setAmount("");
    }
  }, [state.success]);

  return (
    <>
      <h3>Add a Transaction </h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <button>Add Transaction {state.isPending}</button>
      </form>
    </>
  );
}
