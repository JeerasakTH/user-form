import React from 'react';

const EditableRow = ({ selectAge, editInformation, handleEditChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input 
                    className='form-control'
                    type="text" 
                    name="name" 
                    required="required" 
                    placeholder="Enter a name..."
                    value={editInformation.name}
                    onChange={handleEditChange}
                    ></input>
            </td>
            <td>
                <select 
                    className='form-select'
                    name="age" 
                    id="age-select" 
                    value={editInformation.age} 
                    onChange={handleEditChange} 
                    required>
                    <option value="">Age</option>
                        {selectAge().map((age, i) => (
                            <option key={i} value={age}>{age}</option>
                            ))}
                </select>
            </td>
            <td>
                <input 
                    className='form-control'
                    type="text" 
                    name="nickname" 
                    required="required" 
                    placeholder="Enter a nickname..."
                    value={editInformation.nickname}
                    onChange={handleEditChange}
                ></input>
            </td>
            <td>
            <div className='bt-inner bt-edit'>
                <button className='btn btn-primary me-2' type="submit">Save</button>
                <button className='btn btn-danger' type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
            </td>
        </tr>
    );
};

export default EditableRow;