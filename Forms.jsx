import React, { useEffect, useState } from 'react'
const Forms = (props) => {
  const {addItem,itemToEdit,editItem}=props;
  const [title,settitle]=useState("");
  const [amount,setamount]=useState("");
  const isEdit=itemToEdit!==undefined;

  useEffect(()=>{
    settitle(itemToEdit?.title ||"");
    setamount(itemToEdit?.amount || "")
  },[itemToEdit]);


  const handleTitleChange=(e)=>{
    settitle(e.target.value);
  };
  const handleAmountChange=(e)=>{
    setamount(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    isEdit ? editItem(title,amount):addItem(title,amount);
};

  return (
    <>
     <div className='additems'>
      <h3>{isEdit?"Edit":"Add New"}</h3>
      <form>
        <div>
          <p>Title</p>
          <input type="text" id="title" value={title}onChange={handleTitleChange} />
        </div>
        <div>
        <p>Amount</p>
          <input type="text" id="amount" value={amount}onChange={handleAmountChange}/>
        </div>
        <br></br>
        <button style={{backgroundColor:"rgb(14, 132, 14)",padding:"5px 20px",color:"white"}}type="submit"onClick={handleSubmit}>{isEdit?"Save":"Add"}</button>
      </form>
    </div>
    </>
  )
}

export default Forms;