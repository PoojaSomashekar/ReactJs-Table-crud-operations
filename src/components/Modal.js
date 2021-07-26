import React, { Fragment, useState } from 'react';

import classes from './Modal.module.css';
import Card from './Card';

const Modal = (props) => {
  let showRowDetails = props.usersDetails.find((item, index) => {
    return props.id === 'edit' + item.id ? item : [];
  });
  const [editId, setEditId] = useState(showRowDetails.id);
  const [editName, setEditName] = useState(showRowDetails.name);
  const [editCountry, setEditCountry] = useState(showRowDetails.country);
  const [editAge, setEditAge] = useState(showRowDetails.age);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(true);

  const editRowDetails = (events) => {
    if (events.target.id === 'idName') {
      setEditId(events.target.value);
    } else if (events.target.id === 'userName') {
      setEditName(events.target.value);
    } else if (events.target.id === 'countryName') {
      setEditCountry(events.target.value);
    } else if (events.target.id === 'age') {
      setEditAge(events.target.value);
    }
    setSubmitBtnDisable(false);
  }

  const submitEditDetails = (event) => {
    event.preventDefault();
    props.onEditRowDetails(editId, editName, editCountry, editAge);
    setSubmitBtnDisable(true);
  }
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onClose} />
      <Card className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <header classes={classes.header}>
          <h2>Edit User Details</h2>
        </header>
        <div className={classes.content}>
          <form onSubmit={submitEditDetails}>
            <label htmlFor='idName'>ID:</label>
            <input type='text' id='idName' value={editId} onChange={editRowDetails} />
            <label htmlFor='userName'>Name:</label>
            <input type='text' id='userName' value={editName} onChange={editRowDetails} />
            <label htmlFor='countryName'>Country:</label>
            <input type='text' id='countryName' value={editCountry} onChange={editRowDetails} />
            <label htmlFor='age'>Age</label>
            <input type='text' id='age' value={editAge} onChange={editRowDetails} />
            <div className={classes.footer}>
              <button onClick={props.onClose}>Close</button>
              <button type='submit' disabled={submitBtnDisable}>Submit</button>
            </div>
          </form>
        </div>
      </Card>
    </Fragment>

  );
};

export default Modal;