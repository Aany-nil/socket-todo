import { useEffect } from 'react';
import { useState } from 'react';
import { io } from 'socket.io-client';
 const socket = io("http://localhost:8000");

function App() {

  const [inputValue, setInputValue] = useState("");
  const [allTodo, setAllTodo] = useState([]);

  const handleSubmit = () => {
   socket.emit("task", inputValue)
   setInputValue("")
  }

  useEffect(() => {
  socket.on("taskClient", (value) => {
    console.log(value)
  setAllTodo(value);
  })

  }, []);
  
  return (
   
    <div>
      <input value={inputValue} onChange={(e) =>setInputValue(e.target.value)} type="text" placeholder= "enter your list"/>
      <button onClick={handleSubmit}>submit</button>
      <div>
        <ul>
          {allTodo.map((item, index) =>(
            <li key={index}>{item}</li>
          ))
          }
        </ul>
      </div>
    </div>
  
  )
}

export default App
