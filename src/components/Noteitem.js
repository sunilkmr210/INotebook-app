import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const {delNote} = context;
    const { note, updateNote} = props;

    return (
        <div className="col-md-3">
            <div className="card">
                <div className="card-body">
                    <div className="d-flex">
                    <h5 className="card-title">{note.title}</h5>
                    <i className="fa-regular fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                    <i className="fa-solid fa-trash mx-1" onClick={()=>{delNote(note._id)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
