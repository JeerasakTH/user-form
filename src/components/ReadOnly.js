import React from 'react';

const ReadOnly = ({ info, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={info.id}>
            <td>{info.name}</td>
            <td>{info.age}</td>
            <td>{info.nickname}</td>
            <td>
            <div className='bt-inner bt-read'>
                <button type="button" onClick={(e) => handleEditClick(e, info)}>Edit</button>
                <button type="button" onClick={(id) => handleDeleteClick(info.id)}>Delete</button>
            </div>
            </td>
        </tr>
    );
};

export default ReadOnly;