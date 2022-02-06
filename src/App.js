import React, { Fragment, useEffect, useState } from 'react';
// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import EditableRow from './components/EditableRow';
import ReadOnly from './components/ReadOnly';

function App() {
  // info state
  const [informations, setInformations] = useState([{
    id: new Date().getTime(),
    name: "Mr A",
    age: 37,
    nickname: "A",
  }]);
  
  // update info
  const [addInformation, setAddInformation] = useState({
    name: "",
    age: "",
    nickname: "",
  });

  // newInfo
  const [editInformation, setEditInformation] = useState({
    name: "",
    age: "",
    nickname: "",
  });

  // check edit
  const [editInfoId, setEditInfoId] = useState(null);

  // getItem from storage
  useEffect(() => {
    const temp = localStorage.getItem('informations')
    const loadedInfos = JSON.parse(temp)

    if (loadedInfos) {
      setInformations(loadedInfos)
    } else {
      return [];
    }
  }, [])

  // mount to storage
  useEffect(() => {
    const temp = JSON.stringify(informations)
    localStorage.setItem('informations', temp)
  }, [informations])

  // change state
  const handleChange = e => {
    setAddInformation( prevInfo => {
      return { ...prevInfo,[e.target.name]: e.target.value}
    })
 }

  // submit info
  const handleAddFormSubmit = e => {
    e.preventDefault();

    setInformations((prev) => [ ...prev, {
      id: new Date().getTime(),
      name: addInformation.name,
      age: addInformation.age,
      nickname: addInformation.nickname,
    }]);

    e.target.reset();
  }

  // click to edit
  const handleEditClick = (e, info) => {
    e.preventDefault();
    setEditInfoId(info.id);
    
    // get old state
    setEditInformation({
      name: info.name,
      age: info.age,
      nickname: info.nickname,
    })
  }

  // change state in edit
  const handleEditChange = e => {
    setEditInformation( prevInfo => {
      return { ...prevInfo,[e.target.name]: e.target.value}
    }) 
  }

  // click to save
  const handleEditSave = e => {
    e.preventDefault();

    // new state
    const editedInfo = {
      id: editInfoId,
      name: editInformation.name,
      age: editInformation.age,
      nickname: editInformation.nickname,
    }

    const newInfos = [ ...informations ];

    // [ /{id:1}, x{id:2}, x{id:3} ] clicked id
    const index = informations.findIndex((info) => info.id === editInfoId);

    newInfos[index] = editedInfo;
    
    // save new state to state
    setInformations(newInfos);
    setEditInfoId(null);
  };

  // show ReadOnly
  const handleCancelClick = () => {
    setEditInfoId(null);
  }

  // click to delete
  const handleDeleteClick = (infoId) => {
    
    // info.id !== clicked id
    setInformations((info) => info.filter(i => i.id !== infoId));
  }

  // create select age 1-100
  const selectAge = () => {
    let age = [];
    for (let i=1; i<=100; i++) age.push(i);
    return age;
  }

  return (
    <div className="App w-75 my-5 mx-auto">
      <form onSubmit={handleEditSave}>
        <table className='table shadow mb-5'>
          <thead>
            <tr>
              <th scope='col'>Name</th>
              <th scope='col'>Age</th>
              <th scope='col'>Nickname</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {informations.map((info, index) => (
              <Fragment key={index}>
                {editInfoId === info.id ? (
                <EditableRow 
                  handleChange={handleChange} 
                  selectAge={selectAge}
                  editInformation={editInformation}
                  handleEditChange={handleEditChange}
                  handleCancelClick={handleCancelClick} />
                ) : (
                <ReadOnly 
                  info={info} 
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>
      <form onSubmit={handleAddFormSubmit}>
        <div className="form-inner d-flex mb-2">
          <input 
            className='form-control me-2'
            type="text" 
            name="name" 
            required="required" 
            placeholder="Enter a name..."
            onChange={handleChange}
            />
          <select className='form-select' name="age" id="age-select" onChange={handleChange} required>
            <option value="">Age</option>
            {selectAge().map((age, index) => (
              <option value={age} key={index}>{age}</option>
              ))}
          </select>
          <input 
            className='form-control me-2'
            type="text" 
            name="nickname" 
            required="required" 
            placeholder="Enter a nickname..."
            onChange={handleChange}
          />
          <button className='btn btn-primary me-2' type="submit">Save</button>
          <button className='btn btn-danger' type="reset">Cancel</button>
        </div>
        <div className="form-outer">
          <button className='btn btn-primary' type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default App;
