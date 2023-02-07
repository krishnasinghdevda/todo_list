import React from "react";
import "./App.css";

function Table({ addItem, deleteItembtn, editItembtn, search }) {
  // console.log(addItem)
  return (
    <>
      {addItem.length !== 0 ? (
        <div>
        <table id="customers">
          <tr>
            <th>Name</th>
            <th>Task</th>
            <th>Age</th>
            <th>Date</th>
          </tr>
          {addItem.filter((val)=>{
            return search.toLowerCase() === '' 
            ? val
            : val.name.toLowerCase().includes(search)
          }).map((val) => (
            <tr key={val.id}>
              <td>{val.name}</td>
              <td>{val.task}</td>
              <td>{val.age}</td>
              <td>{val.date}</td>
              <td className="text-center font-bold text-red-700">
                <button onClick={() => deleteItembtn(val.id)}>Delete</button>
              </td>
              <td className="text-center font-bold text-green-700">
                <button onClick={() => editItembtn(val.id)}>Edit</button>
              </td>
            </tr>
          ))}
        </table>
        </div>
      ) : (
        <h1 className="font-bold text-center text-xl">No Data to Display</h1>
      )}
    </>
  );
}

export default Table;
