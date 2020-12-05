import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import Todo from './Component/Todo/Todo';
import classes from './App.module.css';
import db from './firebase';
import firebase from 'firebase';
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  // when the app loads,we need to listen to the database and fetch new information
  useEffect(() => {
    // this code here .. fires when the app.js loads
    db.collection('todos')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => ({ id: doc.id, todo: doc.data().todo }))
        );
      });
  });
  const addTodo = (event) => {
    event.preventDefault(); // prevent the form refresh the web
    setTodos([...todos, input]);

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput(''); // clear the input into blank section
  };
  return (
    <div className={classes.App}>
      <h1> Hello this is todo app</h1>
      <form>
        <FormControl>
          <InputLabel>Write your todo things</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        <Button
          disabled={!input}
          variant='contained'
          onClick={addTodo}
          type='submit'
          color='primary'>
          Add todo
        </Button>
      </form>

      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
