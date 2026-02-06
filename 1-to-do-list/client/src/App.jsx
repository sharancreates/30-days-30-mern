import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
	const [todos, setTodos] = useState([])
	const [task, setTask] = useState('')

	useEffect(() => {
    axios.get('http://localhost:5000/get')
      .then(result => setTodos(result.data))
      .catch(err => console.log(err))
    }, [])

	const handleAdd = () => {
    axios.post('http://localhost:5000/add', { task: task })
      .then(result => {
        location.reload() 
      })
      .catch(err => console.log(err))
  	}

	const handleEdit = (id) => {
    axios.put('http://localhost:5000/update/'+id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }

	const handleDelete = (id) => {
    axios.delete('http://localhost:5000/delete/'+id)
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }
	return(
		<div className="home">
      <h2>Todo List</h2>
      <div className="create_form">
        <input 
          type="text" 
          placeholder="Enter Task" 
          onChange={(e) => setTask(e.target.value)} 
        />
        <button type="button" onClick={handleAdd}>Add</button>
      </div>

      {
        todos.length === 0 
        ? <div><h2>No Record</h2></div>
        : todos.map(todo => (
          <div className="task" key={todo._id}>
            <div className="checkbox" onClick={() => handleEdit(todo._id)}>
              {todo.done ? "✅" : "⬜"} 
              <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
            </div>
            <div>
              <span onClick={() => handleDelete(todo._id)}>🗑️</span>
            </div>
          </div>
        ))
      }
    </div>
	)
}

export default App
