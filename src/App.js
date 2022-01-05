import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
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

  const [editInfoId, setEditInfoId] = useState(null);

  useEffect(() => {
    const temp = localStorage.getItem('informations')
    const loadedInfos = JSON.parse(temp)

    if (loadedInfos) {
      setInformations(loadedInfos)
    } else {
      return [];
    }
  }, [])

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

  const handleAddFormSubmit = e => {
    e.preventDefault();

    const newInfo = {
      id: new Date().getTime(),
      name: addInformation.name,
      age: addInformation.age,
      nickname: addInformation.nickname,
    };

    const newInfos = [ ...informations, newInfo];
    setInformations(newInfos);

    e.target.reset();
  }

  const handleEditClick = (e, info) => {
    e.preventDefault();
    setEditInfoId(info.id);

    const infoValues = {
      name: info.name,
      age: info.age,
      nickname: info.nickname,
    }

    setEditInformation(infoValues)
  }

  const handleEditChange = e => {
    setEditInformation( prevInfo => {
      return { ...prevInfo,[e.target.name]: e.target.value}
    }) 
  }

  const handleEditSave = e => {
    e.preventDefault();

    const editedInfo = {
      name: editInformation.name,
      age: editInformation.age,
      nickname: editInformation.nickname,
    }

    const newInfos = [ ...informations ];

    const index = informations.findIndex((info) => info.id === editInfoId);

    newInfos[index] = editedInfo;

    setInformations(newInfos);
    setEditInfoId(null);
  };

  const handleCancelClick = () => {
    setEditInfoId(null);
  }

  const handleDeleteClick = (infoId) => {
    const newInfo = [ ...informations ]

    const index = informations.findIndex((info) => info.id === infoId);

    newInfo.splice(index, 1);

    setInformations(newInfo);
  }

  // create select age 1-100
  const selectAge = () => {
    let age = [];
    for (let i=1; i<=100; i++) age.push(i);
    return age;
  }

  return (
    <div className="App">
      <form onSubmit={handleEditSave}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Nickname</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {informations.map((info) => (
              <Fragment>
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
        <div className="form-inner">
          <input 
            type="text" 
            name="name" 
            required="required" 
            placeholder="Enter a name..."
            onChange={handleChange}
            />
          <select name="age" id="age-select" onChange={handleChange} required>
            <option value="">Choose</option>
            {selectAge().map((age) => (
              <option value={age}>{age}</option>
              ))}
          </select>
          <input 
            type="text" 
            name="nickname" 
            required="required" 
            placeholder="Enter a nickname..."
            onChange={handleChange}
          />
          <button type="submit">Save</button>
          <button type="reset">Cancel</button>
        </div>
        <div className="form-outer">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}

export default App;
