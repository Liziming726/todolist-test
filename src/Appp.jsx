import React,{ useState , useEffect} from 'react'

function Appp() {
  const [todos,setTodos] = useState([]);
  const [input,setInput] = useState("");

  useEffect(()=>{
    const stored = localStorage.getItem('todos');
    if(stored){
      setTodos(JSON.parse(stored));
    }
  },[])
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos));
  },[todos])

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos,input]);
    setInput("");
  }

  const handleDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index,1);
    setTodos(newTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" 
        value={input}
        onChange={(e) => setInput(e.target.value)}/>
      <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo,index) => (
          <li key={index}>
            {todo}
            <button onClick={()=>{handleDelete(index)}}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Appp