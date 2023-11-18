import { useContext, useEffect, useRef, useState } from "react"
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

export default function Notes(props) {
    const context = useContext(noteContext);
    const { notes, setNotes, getNotes, editNote} = context;
    useEffect(() => {
        getNotes();
    }, []);

    const ref = useRef(null);
    const closeref = useRef(null);
    const updateNote = (currNote) => {
        ref.current.click();
        setNote({id: currNote._id, etitle: currNote.title, edescription: currNote.description, etag: currNote.tag});
    }

    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""});
 
    const handleClick = (e)=>{ 
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeref.current.click();
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} minLength={5} required aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
 
            <div className="container row my-3">
                <h2>Your notes</h2>
                <div className="conatainer" mx-2>
                    {notes.length===0&&'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}