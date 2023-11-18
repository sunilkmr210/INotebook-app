import react, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const initialnotes = [
    {
      "_id": "64fb074396df63500d52e4ad",
      "user": "64faad1f3b85e8dfc7ce0d3b",
      "title": "note1",
      "description": "this is note1",
      "date": "2023-09-08T11:36:32.128Z",
      "__v": 0
    }
  ]

  const [notes, setNotes] = useState(initialnotes);

  const getNotes = async () => {
    const url = `${host}/api/notes/fetchNote`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
      },
    })
    const json = await response.json();
    setNotes(json);
  }

  const addNote = async (title, description, tag) => {
    const url = `${host}/api/notes/addNote/64faad1f3b85e8dfc7ce0d3b`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
      },
      body: JSON.stringify({ title, description, tag })
    })
    const note = await response.json();

    // const note = {
    //   "user": "64faad1f3b85e8dfc7ce0d3b",
    //   "title": title,
    //   "description": description,
    //   "date": "2023-09-11T09:31:22.152Z",
    //   "_id": "64fee033d2200ea9fa005bca",
    //   "__v": 0
    // }

    //Do not use push as it only chnges the array and return new length but setState requires the new array after the state change
    setNotes(notes.concat(note));
  }

  const delNote = async (id) => {

    const url = `${host}/api/notes/deleteNote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
      },
    }) 
    const json = response.json();
    const newNotes = notes.filter((note) => { return note._id !== id });
    setNotes(newNotes);
  }

  const editNote = async (id, title, description, tag) => {

    const url = `${host}/api/notes/updateNote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFhZDFmM2I4NWU4ZGZjN2NlMGQzYiIsImlhdCI6MTY5NDE3MjgxM30.DyLxvOX8UacSTh-YWJeyEeQnkTKtvTF2kuE7VqHdqLk'
      },
      body: JSON.stringify({title, description, tag})
    })

    let newNotes = JSON.parse((JSON.stringify(notes)));

    for (let i = 0; i < newNotes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, delNote, getNotes, editNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;