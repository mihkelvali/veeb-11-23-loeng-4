import { useState } from 'react';
import { v4 } from 'uuid';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';

import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([
    {
      text: 'pese hambad',
      isChecked: false,
      id: v4()
    }
  ]);

  const addNewTodo = () => {
    if (inputValue === '') return;
    setTodos((currentTodos) => [
      ...currentTodos,
      {
        text: inputValue,
        isChecked: false,
        id: v4()
      }
    ]);
    setInputValue('');
  }

  const toggleTodoChecked = (id) => {
    const newTodosList = todos.map((todo) => {
      if (todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
      return todo;
    });
    setTodos(newTodosList);
  }

  const deleteTodo = (id) => {
    const newTodosList = todos.filter((todo) => todo.id !== id);
    setTodos(newTodosList);
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
          {
            todos.map((todo) => (
              <div key={todo.id} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                <Checkbox
                  checked={todo.isChecked}
                  onClick={() => toggleTodoChecked(todo.id)}
                />
                <Typography
                  variant="span"
                  sx={{
                    textDecoration: todo.isChecked ? 'line-through' : 'none',
                    alignSelf: 'baseline'
                  }}>
                  {todo.text}
                </Typography>
                <DeleteIcon
                  onClick={() => deleteTodo(todo.id)}
                  sx={{ cursor: 'pointer' }}
                />
              </div>
            ))
          }
        </Box>
      </header>
    </div>
  );
}

export default App;
