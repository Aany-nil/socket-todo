import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io("http://localhost:8000");

function App() {
  const [inputValue, setInputValue] = useState("");
  const [allTodo, setAllTodo] = useState([]);

  const handleSubmit = () => {
    if (!inputValue.trim()) return; 
    socket.emit("task", inputValue);
    setInputValue("");
  };

  
  const handleToggle = (id, currentStatus) => {
    socket.emit("updateTask", { id, isCompleted: !currentStatus });
  };

 
  const handleDelete = (id) => {
    socket.emit("deleteTask", id);
  };

  useEffect(() => {
    socket.on("taskClient", (value) => {
      console.log("Tasks from Mongodb:", value);
      setAllTodo(value);
    });

    return () => {
      socket.off("taskClient");
    };
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Realtime To-Do List</h2>
      
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <input 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          type="text" 
          placeholder="Enter your task..."
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={handleSubmit} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Add
        </button>
      </div>

      <div>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {allTodo.map((item) => (
            <li 
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
                borderBottom: "1px solid #ccc"
              }}
            >
              <span 
                onClick={() => handleToggle(item._id, item.isCompleted)}
                style={{ 
                  cursor: "pointer", 
                  textDecoration: item.isCompleted ? "line-through" : "none",
                  color: item.isCompleted ? "blue" : "gray" 
                }}
              >
                {item.title}
              </span>
              
              <button 
                onClick={() => handleDelete(item._id)}
                style={{ background: "red", color: "white", border: "none", cursor: "pointer" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;