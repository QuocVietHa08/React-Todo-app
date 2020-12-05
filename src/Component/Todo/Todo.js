import React, { useState } from 'react';
import { Modal, ListItemText, List, ListItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import db from '../../firebase';
import classbase from './Todo.module.css';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const updateTodo = () => {
    // update todo with the new input text
    db.collection('todos').doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };
  return (
    <div>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <div>i am modal</div>
          <input
            placeholder={props.todo.todo}
            value={input}
            onChange={(event) => setInput(event.target.value)}></input>
          <button onClick={updateTodo}>Update</button>
        </div>
      </Modal>
      <List className={classbase.List}>
        <ListItem>
          <ListItemText primary={props.todo.todo} />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit me</button>
        <DeleteIcon
          onClick={(event) =>
            db.collection('todos').doc(props.todo.id).delete()
          }
        />
      </List>
    </div>
  );
}

export default Todo;
