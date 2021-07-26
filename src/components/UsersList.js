import React, { useState, Fragment, useEffect } from 'react';

import classes from './UsersList.module.css';
import Modal from './Modal';

const UsersList = (props) => {
  let tableData = [];
  const [showModal, setShowModal] = useState(false);
  const [userId, setUserId] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [showBtns, setShowBtns] = useState(true);

  useEffect(() => {
    setShowBtns(props.deleteRowsDisable);
  }, [props.deleteRowsDisable])

  const selectSingleRow = (event) => {
    if (event.target.checked === true) {
      setShowBtns(false);
    } else {
      setShowBtns(true);
    }
    if (userId.length === 0) {
      setUserId([event.target.id]);
      props.userIdFnc(event.target.id);
    } else {
      setUserId([...userId, event.target.id]);
      props.userIdFnc(event.target.id);
    }
  };
  const deleteSingleRow = () => {
    const deleteUser = [...props.users];
    let copyUserID = [...userId];
    deleteUser.forEach((user, index) => {
      userId.forEach(id => {
        if (user.id === id) {
          deleteUser.splice(index, 1);
          copyUserID.filter(userId => userId !== id);
          props.userIdFnc([]);
        }
      })
    })
    setShowBtns(true);
    setUserId(copyUserID);
    props.setUsers(deleteUser);
  }

  const showModalHandler = (event) => {
    setEditRowId(event.target.id);
    setShowModal(true);
  }

  const closeHandler = () => {
    setShowModal(false);
  }
  const onEditDetails = (id, name, country, age) => {
    let copyUsers = [...props.users];
    copyUsers.forEach(item => {
      if (item.id === id) {
        item.id = id;
        item.name = name;
        item.country = country;
        item.age = age;
      }
    })
    props.setUsers(copyUsers);

  }

  if (props.filteredData.length > 0) {
    tableData = props.filteredData.map(user => {
      return (
        <tr key={user.id}>
          <td><input type='checkbox' name={"chkbx" + user.id} id={user.id} onChange={selectSingleRow} /></td>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.country}</td>
          <td>{user.age}</td>
          <td>
            <button className={classes.delBtn} id={'del' + user.id} disabled={showBtns} onClick={deleteSingleRow}>Delete</button>
            <button className={classes.editBtn} id={'edit' + user.id} onClick={showModalHandler}>Edit</button>
            {showModal && <Modal usersDetails={props.users} id={editRowId} onEditRowDetails={onEditDetails} onClose={closeHandler} />}
          </td>
        </tr>
      )
    });
  } else {
    tableData = props.users.map(user => {
      return (
        <tr key={user.id}>
          <td><input type='checkbox' name={"chkbx" + user.id} id={user.id} onChange={selectSingleRow} /></td>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.country}</td>
          <td>{user.age}</td>
          <td>
            <button className={classes.delBtn} id={'del' + user.id} disabled={showBtns} onClick={deleteSingleRow}>Delete</button>
            <button className={classes.editBtn} id={'edit' + user.id} onClick={showModalHandler}>Edit</button>
            {showModal && <Modal usersDetails={props.users} id={editRowId} onEditRowDetails={onEditDetails} onClose={closeHandler} />}
          </td>
        </tr>
      )
    });
  }
  return (
    <Fragment>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>ID</th>
            <th>NAME</th>
            <th>COUNTRY</th>
            <th>AGE</th>
            <th></th>
          </tr>
          {tableData}
        </tbody>
      </table>
    </Fragment>
  );
};

export default UsersList;