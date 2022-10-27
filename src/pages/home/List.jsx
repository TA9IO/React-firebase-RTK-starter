import React from 'react'
import {useFirestore} from '../../hooks'
function List({data}) {
const {deleteDocument} = useFirestore('transactions')
  return (
    <ul className='transactions'>
    {data.map((data) => (
      <li key={data.key}>
        <p className='name'>{data.name}</p>
        <p className='amount'>${data.amount}</p>
        <button onClick={() => deleteDocument(data.key)}>x</button>
      </li>
    ))}
  </ul>
  )
}

export default List