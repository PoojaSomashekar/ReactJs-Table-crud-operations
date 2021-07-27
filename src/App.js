import { useEffect, useState } from 'react';

import classes from './App.module.css';
import UsersList from './components/UsersList';
import DUMMY_Data from './userData';

const App = () => {
  const [users, setUsers] = useState(DUMMY_Data);
  const [filteredData, setFilteredData] = useState([]);
  const [showBtns, setShowBtns] = useState(true);
  const [rowID, setRowID] = useState([]);

  useEffect(() => {
    if (rowID.length > 1) {
      setShowBtns(false);
    } else {
      setShowBtns(true);
    }
  }, [rowID]);

  const searchNameHandler = (event) => {
    const currentList = [...users];
    let newList = [];
    if (event.target.value !== '') {
      newList = currentList.filter(user => {
        let userName = user.name.toLowerCase();
        let filteredName = event.target.value.toLowerCase();
        return userName.includes(filteredName);
      });
      setFilteredData(newList);
    } else {
      setFilteredData([]);
      setUsers(users);
    }

  }

  const setUserState = (alteredUsers) => {
    setUsers(alteredUsers);
  }
  const getUserIds = (alteredIds) => {
    setRowID([...rowID, alteredIds]);
  }
  const onDeleteRows = () => {
    const copyUsers = [...users];
    let copyUserRowID = [...rowID];
    copyUserRowID.forEach((id, indexID) => {
      copyUsers.forEach((item, index) => {
        if (item.id === id) {
          copyUsers.splice(index, 1);
          copyUserRowID.splice(id, indexID);
        }
      })

    })
    setShowBtns(true);
    setUsers(copyUsers);
    setRowID([copyUserRowID]);
  };

  return (
    <div>
      <h1 className={classes.header}>Table In ReactJs</h1>
      <button className={classes.deleteRowsBtn} disabled={showBtns} onClick={onDeleteRows}>Delete Rows</button>
      <input type='text' name='searchName' id='searchName' className={classes.searchName} onChange={searchNameHandler} placeholder='Search Name...' />
      <UsersList users={users} filteredData={filteredData} setUsers={setUserState} userIdFnc={getUserIds} deleteRowsDisable={showBtns} />
    </div>
  );
}

export default App;
