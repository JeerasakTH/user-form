import React from 'react';

const ReadOnly = ({ info, handleEditClick, handleDeleteClick }) => {
    return (
        <tr key={info.id}>
            <td className='w-25'>{info.name}</td>
            <td className='w-25'>{info.age}</td>
            <td className='w-25'>{info.nickname}</td>
            <td className='w-25'>
            <div className='bt-inner bt-read'>
                <button className='btn btn-success me-2' type="button" onClick={(e) => handleEditClick(e, info)}>Edit</button>
                <button className='btn btn-danger me-2' type="button" onClick={() => handleDeleteClick(info.id)}>Delete</button>
            </div>
            </td>
        </tr>
    );
};

export default ReadOnly;