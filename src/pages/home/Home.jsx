import React, { useState } from "react";
import Transaction from "./Transaction";
import List from "./List";
import { useSelector } from "react-redux";
import { useCollection } from "../../hooks/";
function Home() {
  const user = useSelector((state) => state.auth.user);
  const { displayName, uid } = user;
  const { docs, erorr } = useCollection(
    "transactions",
    ["uid", "==", uid]
  );
  console.log(docs)
  return (
    <div className="container">
      <div className="content">
        transaction list
        <br></br>
        {erorr && <p>{erorr}</p>}
        {!(docs[0] == undefined) ? <List data={docs}></List> : "no data yet..."}
      </div>
      <div className="sidebar">
        <Transaction user={displayName} id={uid} />
      </div>
    </div>
  );
}

export default Home;
