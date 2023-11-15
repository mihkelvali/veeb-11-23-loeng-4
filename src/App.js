import { useState } from 'react';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

import './App.css';

/*
{
  text: 'pese hambad',
  isChecked: false,
  id: 0,
  isDeleted: false
}
*/

function App() {
  const [todoIdCounter, setTodoIdCounter] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    {
      text: 'pese hambad',
      isChecked: false,
      id: 0
    }
  ]);



  const addNewTodo = () => {
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        text: inputValue,
        isChecked: false,
        isDeleted: false,
        id: todos.length
      }
    ]);
    setInputValue('');
    console.log(todos);
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2>todos</h2>
        <Box
          sx={{
            maxWidth: 400,
            width: "100%"
          }}
        >
          <Stack spacing={2} direction="row">
            <TextField
              fullWidth
              label="What needs to be done?"
              variant="standard"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(ev) => {
                if (ev.key === 'Enter') {
                  addNewTodo();
                  ev.preventDefault();
                }
              }}
            />
            <Button variant="outlined" onClick={addNewTodo}>Add</Button>
          </Stack>
          {/* todo list */}
          {
            todos.map((todo) => (
              !todo.isDeleted ? (
                <div key={todo.id}>
                  <Checkbox checked={todo.isChecked} /> {todo.text} <a>x</a>
                </div>
              ) : null
            ))
          }
        </Box>
      </header>
    </div>
  );
}

export default App;
