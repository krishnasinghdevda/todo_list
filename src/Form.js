import React, { useState } from "react";
import uuid from "react-uuid";
import Table from "./Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [age, setAge] = useState("");
  const [date, setDate] = useState("");
  const [addItem, setaddItem] = useState([]);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [itemId, setItemId] = useState();
  const[search,setSearch]=useState('')
  const [usererr,setUsererr]=useState(false)

  function handleName(e) {
    let item = e.target.value
    if(item.length<5){
   setUsererr(true)
    }else{
        setUsererr(false)
    }
    setName(e.target.value);
  }

  function handleTask(e) {
    setTask(e.target.value);
  }

  function handleAge(e) {
    setAge(e.target.value);
  }

  function handleDate(e) {
    setDate(e.target.value);
  }

  function addItembtn() {
    if (toggleBtn) {
      const newList = addItem.map((todo) => {
        if (todo.id === itemId) {
          return { ...todo, name: name, task: task, age: age, date: date };
        }
        return todo;
      });
      setaddItem(newList);
      setToggleBtn(false);
      setName("");
      setTask("");
      setAge("");
      setDate("");
      setItemId();
      toast.info("Item updated successfully");
    } else {
      const itemObj = {
        id: uuid(),
        name: name,
        task: task,
        age: age,
        date: date,
      };
      setaddItem((prevItem) => [...prevItem, itemObj]);
      setName("");
      setTask("");
      setAge("");
      setDate("");
      // console.log(itemObj)
      toast.success("Item added successfully");
    }
  }

  function deleteItembtn(id) {
    console.log(id);
    const filterItem = addItem.filter((value) => {
      return value.id !== id;
    });
    setaddItem(filterItem);
    toast.error("Item deleted successfully");
  }

  function deleteAllbtn() {
    setaddItem([]);
    toast.error("All item deleted successfully");
  }

  function editItembtn(id) {
    const editTodo = addItem.find((val) => {
      return val.id === id;
    });
    setName(editTodo.name);
    setTask(editTodo.task);
    setAge(editTodo.age);
    setDate(editTodo.date);
    setToggleBtn(true);
    setItemId(id);
  }

  return (
    <div className="max-w-5xl flex mt-5">
        <h1 className="text-8xl text-green-700">TODO list</h1>
        
      <div className="w-full center">

      <div className="mb-4">
          
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={search}
              id="name"
              type="text"
              placeholder="search by name"
              onChange={(e)=>setSearch(e.target.value)}
            />
          </div>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              id="name"
              type="text"
              placeholder="Enter your name"
              onChange={handleName}
            />
            {usererr?<span className="text-red-600">please fill more than 5 character</span>:''}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Task
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={task}
              id="name"
              type="text"
              placeholder="Enter task"
              onChange={handleTask}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="age"
            >
              Age
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={age}
              id="password"
              type="number"
              placeholder="Enter your age"
              onChange={handleAge}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="age"
            >
              Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={date}
              id="password"
              type="date"
              placeholder="Enter Date"
              onChange={handleDate}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={addItembtn}
              disabled={name.length < 5 ? true : false}
            >
              {toggleBtn ? "Update" : "Add"}
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={deleteAllbtn}
            >
              Delete All
            </button>
          </div>
        </form>
        <div>
          <Table
            addItem={addItem}
            deleteItembtn={deleteItembtn}
            editItembtn={editItembtn}
            search={search}
          />
          <ToastContainer theme="colored" />
        </div>
      </div>
    </div>
  );
}

export default Form;
