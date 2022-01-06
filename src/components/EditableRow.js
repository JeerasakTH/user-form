import React from 'react';

const EditableRow = ({ selectAge, editInformation, handleEditChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input 
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
                    name="age" 
                    id="age-select" 
                    value={editInformation.age} 
                    onChange={handleEditChange} 
                    required>
                    <option value="">Age</option>
                        {selectAge().map((age) => (
                            <option value={age}>{age}</option>
                            ))}
                </select>
            </td>
            <td>
                <input 
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
                <button type="submit">Save</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </div>
            </td>
        </tr>
    );
};

export default EditableRow;