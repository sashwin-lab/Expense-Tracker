import React, { useState } from 'react'
import "./index.css"
import Expensecard from './component/Expensecard';
import Forms from './component/Forms';
const expenses=[
  {
  id:1,
  title:"car",
  amount:-200
},
{
  id:2,
  title:"salary",
  amount:2000
},
{
  id:3,
  title:"snacks",
  amount:3000
}
];
const App = () => {
  const [list,setList]=useState(expenses)
  const [editId,setEditId]=useState();
  let income=0
  let expense=0

  const itemToEdit=list.find((item)=>item.id===editId);
  console.log(itemToEdit);

list.forEach((j)=>{
  if(j.amount>0){
    income+=Number(j.amount);
  }
  else{
    expense+=Number(j.amount);
  }
});

const deleteItem=(id)=>{
  console.log("Ïtem deleted",id);
  const result=list.filter((i)=>{
    return i.id!=id;
  });
  setList([...result]);
};

const addItem=(title,amount)=>{
  const newItem={
    id:list[list.length-1].id+1,
    title:title,
    amount:amount,
  };
  setList([newItem,...list]);
}

const editItem = (title, amount) =>{
  const res = list.map((item)=>{
    if(item.id === editId){
      item.title = title;
      item.amount = parseInt(amount);
    }
    return item;
  });
  setList([...res]);
};


  return (
    <>
    <div className='up'>
    <h1>Expense Tracker</h1>
    <div className='expense'>
    <div>
      <h3>Expense</h3>
      <p>{expense}</p>
    </div>
      <div>
        <h3>Income</h3>
        <p>{income}</p>
        </div>
    </div>
    <Forms addItem={addItem} itemToEdit={itemToEdit} editItem={editItem}/>
    <h1>History</h1>
    <div className='list-container'>

    {/* for looping */}
    {/* {expenses.map((i)=>{
      return <Expensecard key={i.id} details={i}/>
    })} */}
    {list.map((i)=>{
     return <Expensecard key={i.id} title={i.title} amount={i.amount} deleteItem={deleteItem} id={i.id} setEditId={setEditId}/>
    })}
    </div>
    </div>
    </>

  )
}

export default App